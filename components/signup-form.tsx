"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gymInfo } from "@/lib/gym-data";
import { Send, CheckCircle } from "lucide-react";

export function SignupForm() {
  // Tracks whether the form has been submitted or not
  const [submitted, setSubmitted] = useState(false);

  // Stores the values entered by the user in the form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    medicalCondition: "",
    conditionDetails: "",
    fitnessFocus: "",
    lastExercise: "",
  });

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting form data:", formData);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("API response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form.");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };






  return (
    <section
      id="signup"
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      {/* Main container for the signup section */}
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Section heading and description */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Join <span className="text-primary">{gymInfo.name}</span>
            </h2>

            <p className="text-muted-foreground text-lg">
              Start your fitness journey today. Fill out the form below and
              we&apos;ll get in touch!
            </p>
          </div>

          {/* Card that contains either the form or the success message */}
          <div className="bg-card rounded-3xl border border-border p-8 md:p-12">
            
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-secondary" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Form Submitted Successfully!
                </h3>

                <p className="text-muted-foreground">
                  Thank you for completing the form. We&apos;ll review your information and contact you shortly.
                </p>
              </div>
            ) : (
              // Show this form before the user submits it
              <form onSubmit={handleSubmit} className="space-y-6">
                
                
                {/* First name and last name input fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      First Name
                    </label>

                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter first name"
                      required
                      className="bg-muted border-border rounded-xl h-12"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Last Name
                    </label>

                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter last name"
                      required
                      className="bg-muted border-border rounded-xl h-12"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Email input field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address
                  </label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-muted border-border rounded-xl h-12"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                {/* Phone number input field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Phone Number
                  </label>

                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (876) 123-4567"
                    required
                    className="bg-muted border-border rounded-xl h-12"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                {/* Medical condition question */}
                <div>
                  <label
                    htmlFor="medicalCondition"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Do you have a medical condition?
                  </label>

                  <select
                    id="medicalCondition"
                    required
                    className="w-full bg-muted border border-border rounded-xl h-12 px-3 text-sm text-foreground"
                    value={formData.medicalCondition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medicalCondition: e.target.value,
                        conditionDetails:
                          e.target.value === "Yes"
                            ? formData.conditionDetails
                            : "",
                      })
                    }
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Unsure">Unsure</option>
                  </select>
                </div>

                {/* Only show this field if the user selects Yes */}
                {formData.medicalCondition === "Yes" && (
                  <div>
                    <label
                      htmlFor="conditionDetails"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      What is the medical condition?
                    </label>

                    <textarea
                      id="conditionDetails"
                      required
                      placeholder="Please briefly describe the condition"
                      className="w-full bg-muted border border-border rounded-xl min-h-28 p-3 text-sm text-foreground resize-none"
                      value={formData.conditionDetails}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          conditionDetails: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                {/* Fitness focus question */}
                <div>
                  <label
                    htmlFor="fitnessFocus"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    What would you like to focus on?
                  </label>

                  <textarea
                    id="fitnessFocus"
                    required
                    placeholder="Example: weight loss, strength training, recovery, flexibility, general fitness"
                    className="w-full bg-muted border border-border rounded-xl min-h-28 p-3 text-sm text-foreground resize-none"
                    value={formData.fitnessFocus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fitnessFocus: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Last exercise question */}
                <div>
                  <label
                    htmlFor="lastExercise"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    When was your last exercise?
                  </label>

                  <select
                    id="lastExercise"
                    required
                    className="w-full bg-muted border border-border rounded-xl h-12 px-3 text-sm text-foreground"
                    value={formData.lastExercise}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastExercise: e.target.value,
                      })
                    }
                  >
                    <option value="">Select an option</option>
                    <option value="Within the last month">
                      Within the last month
                    </option>
                    <option value="1-3 months ago">1-3 months ago</option>
                    <option value="Over 3 months ago">
                      Over 3 months ago
                    </option>
                    <option value="More than a year ago">
                      More than a year ago
                    </option>
                    <option value="Never exercised">Never exercised</option>
                  </select>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-14 text-lg font-semibold"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Join GymOxytocin
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}