use std::path::Path;
use tract_onnx::prelude::*;
use ic_cdk::export::candid::{CandidType, Deserialize};
use ic_cdk::export::Principal;
use ic_cdk_macros::*;

#[derive(CandidType, Deserialize)]
struct ModelOutput {
    output: Vec<f32>, // Model result
}

fn load_model() -> SimplePlan<TypedFact, Box<dyn TypedOp>, Graph<TypedFact, Box<dyn TypedOp>>> {
    let model_path = Path::new("models/model.onnx");
    
    let model = tract_onnx::onnx()
        .model_for_path(model_path)
        .unwrap()
        .into_optimized()
        .unwrap()
        .into_runnable()
        .unwrap();
    
    model
}

// Function to run inference
#[update]
fn run_inference(input_data: Vec<f32>) -> ModelOutput {
    let model = load_model();

    let input_tensor = tract_ndarray::Array::from_shape_vec((1, input_data.len()), input_data)
        .unwrap()
        .into_tensor();

    let result = model.run(tvec!(input_tensor)).unwrap();

    let output_tensor = result[0].to_array_view::<f32>().unwrap();
    let output = output_tensor.iter().cloned().collect();

    ModelOutput { output }
}
