// src/TfExample.js
import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const TfExample = () => {
  const [trained, setTrained] = useState(false);
  const [model, setModel] = useState(null);
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const trainModel = async () => {
      // Step 1: Create a simple linear model
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

      // Step 2: Compile the model with an adjusted learning rate
      model.compile({
        optimizer: tf.train.sgd(0.000001), // Smaller learning rate for stability
        loss: 'meanSquaredError',
      });

      // Step 3: Normalize the training data
      const squareFootages = [500, 1000, 1500, 2000, 2500];
      const prices = [150000, 300000, 450000, 600000, 750000];

      // Calculate min and max for normalization
      const minSqFt = Math.min(...squareFootages);
      const maxSqFt = Math.max(...squareFootages);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      const normalize = (val, min, max) => (val - min) / (max - min);

      const xs = tf.tensor2d(squareFootages.map((sqFt) => normalize(sqFt, minSqFt, maxSqFt)), [5, 1]);
      const ys = tf.tensor2d(prices.map((price) => normalize(price, minPrice, maxPrice)), [5, 1]);

      // Step 4: Train the model and set it in state
      await model.fit(xs, ys, {
        epochs: 200,
        callbacks: {
          onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch}: loss = ${logs.loss}`),
        },
      });
      
      setModel(model);
      setTrained(true);
    };

    trainModel();
  }, []);

  // Prediction handler
  const handlePredict = () => {
    if (model && trained && input) {
      // Convert the input to a number and normalize it
      const inputVal = parseFloat(input);
      if (isNaN(inputVal)) {
        setPrediction('Invalid input');
        return;
      }

      const minSqFt = 500; // Minimum square footage in training data
      const maxSqFt = 2500; // Maximum square footage in training data
      const minPrice = 150000; // Minimum price in training data
      const maxPrice = 750000; // Maximum price in training data

      const normalizedInput = (inputVal - minSqFt) / (maxSqFt - minSqFt);
      const inputTensor = tf.tensor2d([normalizedInput], [1, 1]);

      // Predict and fetch the output
      const outputTensor = model.predict(inputTensor);
      const normalizedOutput = outputTensor.dataSync()[0];
      const outputValue = normalizedOutput * (maxPrice - minPrice) + minPrice;
      setPrediction(outputValue);

      // Clean up tensors
      inputTensor.dispose();
      outputTensor.dispose();
    }
  };

  return (
    <div>
      <h1>House Price Prediction</h1>
      <p>Enter the square footage to predict the house price:</p>
      <input
        type="number"
        placeholder="Square footage"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handlePredict} disabled={!trained || !input}>
        Predict Price
      </button>
      {prediction && (
        <div>
          <h2>Predicted Price: ${isNaN(prediction) ? 'Invalid output' : prediction.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default TfExample;
