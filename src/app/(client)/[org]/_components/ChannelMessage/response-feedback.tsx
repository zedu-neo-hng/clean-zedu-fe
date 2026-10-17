"use client";

import { useState } from "react";
import { showError } from "~/components/toast/sonner";
import { cn } from "~/lib/utils";

type Rating = "up" | "down";

interface ResponseFeedbackProps {
  messageId: string;
}

const ResponseFeedback = ({ messageId }: ResponseFeedbackProps) => {
  const [rating, setRating] = useState<Rating | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRating = async (nextRating: Rating) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message_id: messageId, rating: nextRating }),
      });

      if (!response.ok) {
        showError("Unable to submit feedback. Please try again.");
        return;
      }

      setRating(nextRating);
    } catch {
      showError("Unable to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="group"
      aria-label="Rate this assistant response"
      className="mt-2 flex items-center gap-1"
    >
      <button
        type="button"
        aria-label="Helpful response"
        aria-pressed={rating === "up"}
        disabled={isSubmitting}
        onClick={() => submitRating("up")}
        className={cn(
          "rounded-md border border-transparent px-2 py-1 text-sm transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50",
          rating === "up" && "border-blue-200 bg-blue-50"
        )}
      >
        👍
      </button>
      <button
        type="button"
        aria-label="Unhelpful response"
        aria-pressed={rating === "down"}
        disabled={isSubmitting}
        onClick={() => submitRating("down")}
        className={cn(
          "rounded-md border border-transparent px-2 py-1 text-sm transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50",
          rating === "down" && "border-blue-200 bg-blue-50"
        )}
      >
        👎
      </button>
    </div>
  );
};

export default ResponseFeedback;
