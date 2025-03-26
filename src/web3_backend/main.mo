import Blob "mo:base/Blob";
import _Text "mo:base/Text";
import _Result "mo:base/Result";

actor Web3Backend {
    // Define the Rust backend canister
    let rust_backend = actor ("rrkah-fqaaa-aaaaa-aaaaq-cai") : actor {
        process_audio : shared (Blob) -> async [Float];
    };

    // Function to receive MP3, send it to Rust, and return results
    public shared func uploadMp3(mp3File: Blob) : async [Float] {
        let result: [Float] = await rust_backend.process_audio(mp3File);
        return result;
    };
}
