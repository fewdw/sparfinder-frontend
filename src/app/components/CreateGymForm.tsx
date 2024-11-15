"use client";
import { CREATE_NEW_GYM } from "@/utils/API_REQUESTS";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateGymForm: React.FC = () => {
  const router = useRouter();

  // State variables for form fields
  const [name, setName] = useState("");
  const [rules, setRules] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // State for error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState("");

  // Compress Image Function
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");

          // Reduce the size of the image by scaling dimensions
          const scaleFactor = Math.sqrt(0.3); // Approximately 0.5477
          const width = img.width * scaleFactor;
          const height = img.height * scaleFactor;

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const compressedFile = new File([blob], file.name, {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                } else {
                  reject(new Error("Compression failed"));
                }
              },
              "image/jpeg",
              0.7 // Compression quality (0 to 1)
            );
          } else {
            reject(new Error("Canvas not supported"));
          }
        };

        img.onerror = (err) => {
          reject(err);
        };
      };

      reader.onerror = (err) => {
        reject(err);
      };
    });
  };

  // Handle file input change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      try {
        // Compress the image
        const compressedFile = await compressImage(selectedFile);
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes

        if (compressedFile.size > maxSize) {
          setErrors((prev) => ({
            ...prev,
            file: "File size must be under 5MB after compression",
          }));
          setFile(null);
        } else {
          setFile(compressedFile);
          if (errors.file) {
            setErrors((prev) => ({ ...prev, file: "" }));
          }
        }
      } catch (error) {
        console.error("Image compression error:", error);
        setErrors((prev) => ({ ...prev, file: "Failed to compress image" }));
        setFile(null);
      }
    } else {
      setFile(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitError("");

    // Validate form fields
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 3 || name.trim().length > 50) {
      newErrors.name = "Name must be between 3 and 50 characters";
    }

    // Rules validation
    if (!rules.trim()) {
      newErrors.rules = "Rules are required";
    } else if (rules.trim().length < 3 || rules.trim().length > 1000) {
      newErrors.rules = "Rules must be between 3 and 1000 characters";
    }

    // Address (location) validation
    if (!address.trim()) {
      newErrors.address = "Address is required";
    } else if (address.trim().length < 3 || address.trim().length > 300) {
      newErrors.address = "Address must be between 3 and 300 characters";
    }

    // Country validation
    if (!country.trim()) {
      newErrors.country = "Country is required";
    }

    // File validation
    if (!file) {
      newErrors.file = "Profile picture is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("rules", rules.trim());
    formData.append("location", address.trim());
    formData.append("country", country.trim());
    if (file) {
      formData.append("profilePic", file);
    }

    // Send POST request
    try {
      const response = await fetch(CREATE_NEW_GYM, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        // Handle error
        setSubmitError("Please fill form correctly");
        console.error("Failed to create gym");
      }
    } catch (error) {
      setSubmitError("Please fill form correctly");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name" className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            id="name"
            type="text"
            className={`input input-bordered w-full ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Enter gym name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: "" }));
              }
            }}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        {/* Rules */}
        <div>
          <label htmlFor="rules" className="label">
            <span className="label-text">Rules</span>
          </label>
          <textarea
            id="rules"
            className={`textarea textarea-bordered w-full ${
              errors.rules ? "border-red-500" : ""
            }`}
            placeholder="Enter rules"
            value={rules}
            onChange={(e) => {
              setRules(e.target.value);
              if (errors.rules) {
                setErrors((prev) => ({ ...prev, rules: "" }));
              }
            }}
          ></textarea>
          {errors.rules && <p className="text-red-500">{errors.rules}</p>}
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="label">
            <span className="label-text">Country</span>
          </label>
          <select
            id="country"
            className={`select select-bordered w-full max-w-xs ${
              errors.country ? "border-red-500" : ""
            }`}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              if (errors.country) {
                setErrors((prev) => ({ ...prev, country: "" }));
              }
            }}
          >
            <option value="" disabled>
              Select country
            </option>
            <option>USA</option>
            <option>MEXICO</option>
            <option>PHILIPPINES</option>
            <option>UK</option>
            <option>RUSSIA</option>
            <option>CUBA</option>
            <option>JAPAN</option>
            <option>THAILAND</option>
            <option>ARGENTINA</option>
            <option>UKRAINE</option>
            <option>KAZAKHSTAN</option>
            <option>GERMANY</option>
            <option>CANADA</option>
            <option>SPAIN</option>
            <option>BRAZIL</option>
          </select>
          {errors.country && <p className="text-red-500">{errors.country}</p>}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            id="address"
            type="text"
            className={`input input-bordered w-full ${
              errors.address ? "border-red-500" : ""
            }`}
            placeholder="Enter location"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (errors.address) {
                setErrors((prev) => ({ ...prev, address: "" }));
              }
            }}
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>

        {/* File Input */}
        <div>
          <label htmlFor="file" className="label">
            <span className="label-text">Upload File</span>
          </label>
          <input
            id="file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={`file-input file-input-bordered w-full max-w-xs ${
              errors.file ? "border-red-500" : ""
            }`}
            onChange={handleFileChange}
          />
          {errors.file && <p className="text-red-500">{errors.file}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-active btn-primary">
          Submit
        </button>
        {submitError && (
          <p className="text-red-500 text-center mt-4">{submitError}</p>
        )}
      </form>
    </>
  );
};

export default CreateGymForm;
