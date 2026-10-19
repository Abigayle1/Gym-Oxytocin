"use client";

import { useState, type FormEvent } from "react";
import { signOut } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MemberUpdatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    achievement: "",
    testimonial: "",
    imageUrl: "",
    memberSince: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      achievement: "",
      testimonial: "",
      imageUrl: "",
      memberSince: "",
    });

    setImageFile(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      await fetch("/api/admin/session", {
        method: "DELETE",
      });

      window.location.href = "/owner/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMemberSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setSaveError("");

    try {
      let finalImageUrl = formData.imageUrl.trim();

      if (imageFile) {
        const fileExtension = imageFile.name.split(".").pop() || "jpg";
        const safeFileName = `member-highlight-${Date.now()}.${fileExtension}`;
        const storageRef = ref(storage, `member-highlight/${safeFileName}`);

        await uploadBytes(storageRef, imageFile);

        finalImageUrl = await getDownloadURL(storageRef);
      }

      const cleanedData = {
        name: formData.name.trim(),
        achievement: formData.achievement.trim(),
        testimonial: formData.testimonial.trim(),
        image: finalImageUrl,
        memberSince: formData.memberSince.trim(),
      };

      if (
        !cleanedData.name ||
        !cleanedData.achievement ||
        !cleanedData.testimonial ||
        !cleanedData.image ||
        !cleanedData.memberSince
      ) {
        setSaveError("Please complete all fields and upload an image.");
        setSaving(false);
        return;
      }

      await setDoc(doc(db, "siteContent", "memberHighlight"), {
        ...cleanedData,
        updatedAt: serverTimestamp(),
      });

      resetForm();
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to save Member of the Month:", error);

      setSaveError(
        "Could not save the member details. Check Firebase Storage, Firestore rules, and your admin login."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 flex flex-col gap-4 text-center md:text-left md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Member of the Month Admin
            </h1>

            <p className="mt-3 text-muted-foreground">
              Update the information displayed in the Member of the Month
              section.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
          {submitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Member Details Saved
              </h2>

              <p className="text-muted-foreground">
                The Member of the Month details and image were saved.
              </p>

              <Button
                type="button"
                className="mt-6 rounded-full"
                onClick={() => {
                  setSubmitted(false);
                  setSaveError("");
                }}
              >
                Update Again
              </Button>
            </div>
          ) : (
            <form onSubmit={handleMemberSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Member Name
                </label>

                <Input
                  id="name"
                  type="text"
                  placeholder="Example: Travane Morrison"
                  required
                  className="bg-muted border-border rounded-xl h-12"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="achievement"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Achievement
                </label>

                <Input
                  id="achievement"
                  type="text"
                  placeholder="Example: Bench 450lbs"
                  required
                  className="bg-muted border-border rounded-xl h-12"
                  value={formData.achievement}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      achievement: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="memberSince"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Member Since
                </label>

                <Input
                  id="memberSince"
                  type="text"
                  placeholder="Example: January 2025"
                  required
                  className="bg-muted border-border rounded-xl h-12"
                  value={formData.memberSince}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      memberSince: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="imageFile"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Upload Member Image
                </label>

                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  className="bg-muted border-border rounded-xl h-12"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setImageFile(file);
                  }}
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  Upload the photo for the highlighted member.
                </p>
              </div>

              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Image URL Backup
                </label>

                <Input
                  id="imageUrl"
                  type="text"
                  placeholder="Optional: paste an existing hosted image URL"
                  className="bg-muted border-border rounded-xl h-12"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      imageUrl: e.target.value,
                    })
                  }
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  Only use this if you are not uploading an image file.
                </p>
              </div>

              <div>
                <label
                  htmlFor="testimonial"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Testimonial
                </label>

                <textarea
                  id="testimonial"
                  placeholder="Enter the member testimonial"
                  required
                  className="w-full min-h-32 resize-none rounded-xl border border-border bg-muted p-3 text-sm text-foreground"
                  value={formData.testimonial}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      testimonial: e.target.value,
                    })
                  }
                />
              </div>

              {saveError && (
                <p role="alert" className="text-sm text-red-500">
                  {saveError}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={saving}
                className="w-full rounded-full h-14 text-lg font-semibold"
              >
                {saving ? "Saving..." : "Save Member of the Month"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}