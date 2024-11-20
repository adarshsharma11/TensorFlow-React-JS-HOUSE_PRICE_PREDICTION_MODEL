# House Price Prediction with TensorFlow.js

This project demonstrates a simple machine learning example using **TensorFlow.js**. The app predicts house prices based on square footage using a trained linear regression model. It showcases how to create, train, and use TensorFlow.js models directly in a React application.

## Features
- Simple linear regression for predicting house prices.
- Training data and predictions integrated seamlessly into the React UI.
- Real-time predictions based on user input.

## Technologies Used
- **React.js**: For the user interface.
- **TensorFlow.js**: For building and training the machine learning model.

## How It Works
1. A linear model is trained on a dataset of house prices and square footages.
2. The model learns to predict the price based on the input square footage.
3. The app provides predictions for new inputs in real time.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/adarshsharma11/TensorFlow-Recat-JS-HOUSE_PRICE_PREDICTION_MODEL.git

   cd TensorFlow-Recat-JS-HOUSE_PRICE_PREDICTION_MODEL

   yarn & yarn dev

   
## Usage
Enter a square footage value in the input box.
Click the Predict Price button.
The app will display the predicted price for the given square footage.
Example Output
Input: 1200 square feet
Output: Predicted price: $360,000
Training Data
The app uses the following training data:

Square Footages: 500, 1000, 1500, 2000, 2500
Prices: $150,000, $300,000, $450,000, $600,000, $750,000
