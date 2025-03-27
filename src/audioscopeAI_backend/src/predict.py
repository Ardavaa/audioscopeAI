import numpy as np
import librosa as lb
import onnxruntime as ort
import pickle
import json
import sys

class_labels = ["Asthma", "Bronchiectasis", "Bronchiolitis", "COPD", "Healthy", "LRTI", "Pneumonia", "URTI"]

class AudioInferencePipeline:
    def __init__(self, onnx_model_path, max_len=6, sr=22050, expected_time_frames=259, n_mfcc=20):
        self.onnx_model_path = onnx_model_path
        self.max_len = max_len
        self.sr = sr
        self.expected_time_frames = expected_time_frames
        self.n_mfcc = n_mfcc

        # Load ONNX model session
        self.session = ort.InferenceSession(onnx_model_path)
        print("✅ ONNX model loaded successfully!")

    def preprocess(self, file_path):
        soundArr, sample_rate = lb.load(file_path, sr=self.sr)
        fixed_audio = lb.util.fix_length(soundArr, size=self.max_len * self.sr)

        mfcc = lb.feature.mfcc(y=fixed_audio, sr=self.sr, n_mfcc=self.n_mfcc)
        croma = lb.feature.chroma_stft(y=fixed_audio, sr=self.sr)
        mspec = lb.feature.melspectrogram(y=fixed_audio, sr=self.sr)

        def fix_time_dim(feature, expected_frames):
            if feature.shape[1] > expected_frames:
                return feature[:, :expected_frames]
            pad_width = expected_frames - feature.shape[1]
            return np.pad(feature, ((0, 0), (0, pad_width)), mode="constant")

        mfcc = fix_time_dim(mfcc, self.expected_time_frames)
        croma = fix_time_dim(croma, self.expected_time_frames)
        mspec = fix_time_dim(mspec, self.expected_time_frames)

        return (
            np.expand_dims(np.expand_dims(mfcc, axis=0), axis=1).astype(np.float32),
            np.expand_dims(np.expand_dims(croma, axis=0), axis=1).astype(np.float32),
            np.expand_dims(np.expand_dims(mspec, axis=0), axis=1).astype(np.float32),
        )

    def softmax(self, logits):
        exp_logits = np.exp(logits - np.max(logits))
        return exp_logits / np.sum(exp_logits)

    def predict(self, file_path):
        mfcc, croma, mspec = self.preprocess(file_path)
        input_feed = {"mfcc": mfcc, "croma": croma, "mspec": mspec}
        outputs = self.session.run(None, input_feed)
        probabilities = self.softmax(outputs[0][0])

        predicted_class = int(np.argmax(probabilities))
        pred_label = class_labels[predicted_class]

        probs_dict = {label: f"{prob * 100:.2f}%" for label, prob in zip(class_labels, probabilities)}
        return {"prediction": pred_label, "probabilities": probs_dict}

if __name__ == "__main__":
    onnx_model_path = "respiratory_sound_classifier.onnx"
    pipeline = AudioInferencePipeline(onnx_model_path)

    audio_file = sys.argv[1]
    result = pipeline.predict(audio_file)
    print(json.dumps(result, indent=4))
