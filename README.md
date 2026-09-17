# 🌱 AI-Powered Soil Analytics for Crop Management

## 📌 Project Overview

AI-Powered Soil Analytics for Crop Management is a machine learning project that combines soil image analysis with structured soil and climate data to support soil classification and crop recommendation.

The system uses Computer Vision, Transfer Learning, Structured Machine Learning, Explainable AI, and Hybrid Analysis.

---

## 🎯 Objectives

- Classify soil types from soil images.
- Recommend suitable crops using soil and climate parameters.
- Evaluate machine learning models using standard performance metrics.
- Provide model explainability using Grad-CAM.
- Combine image-based soil classification with structured crop recommendation.

---

## 📊 Datasets

### Soil Image Dataset

- Total images: **1,224**
- Number of soil classes: **7**

Classes:

- Alluvial Soil
- Arid Soil
- Black Soil
- Laterite Soil
- Mountain Soil
- Red Soil
- Yellow Soil

### Structured Dataset

- Records: **2,200**
- Features: N, P, K, Temperature, Humidity, pH and Rainfall
- Crop classes: **22**
- Missing values: **0**
- Duplicate records: **0**

---

## 🤖 Models Used

### 1. Soil Image Classification

**Model:** ResNet50 Transfer Learning

The ResNet50 model pretrained on ImageNet was used as the base CNN model. Data augmentation and ResNet50 preprocessing were applied before classification.

**Test Accuracy: 81.71%**

### 2. Crop Recommendation

**Model:** Random Forest Classifier

The model uses soil nutrient and climate parameters to predict the suitable crop.

**Test Accuracy: 99.55%**

---

## 🔍 Explainable AI

Grad-CAM (Gradient-weighted Class Activation Mapping) was used to visualize the image regions contributing to the soil classification prediction.

The final convolutional layer used for Grad-CAM was:

`conv5_block3_out`

---

## 🔗 Hybrid Analysis

The hybrid approach combines:

**Soil Image → ResNet50 → Soil Type**

and

**Soil & Climate Data → Random Forest → Crop Recommendation**

Example hybrid result:

- Predicted Soil Type: **Black Soil**
- Recommended Crop: **Rice**

---

## 📈 Final Results

| Component | Model | Test Accuracy |
|---|---|---:|
| Soil Image Classification | ResNet50 Transfer Learning | **81.71%** |
| Crop Recommendation | Random Forest | **99.55%** |

---

## 🛠️ Technologies Used

- Python
- Google Colab
- TensorFlow / Keras
- Scikit-learn
- NumPy
- Pandas
- Matplotlib
- ResNet50
- Random Forest
- Grad-CAM
- GitHub

---

## 📁 Project Files

```text
AI-Powered-Soil-Analytics/
│
├── data/
│   └── raw/
│
├── AI_Powered_Soil_Analytics.ipynb
├── AI_Powered_Soil_Analytics_Milestone_2.ipynb
├── dataset_inventory.txt
├── requirements.txt
└── README.md
