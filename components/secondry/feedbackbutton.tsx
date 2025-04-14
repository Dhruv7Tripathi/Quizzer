"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { MessageSquare, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/usetoast";
import Link from "next/link";
import axios from "axios";

export default function FeedbackButton() {
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/feedback", {
        feedbackType,
        message,
        email: email.trim() || undefined,
      });
      if (response.status !== 200) {
        throw new Error("Failed to submit feedback. Please try again.");
      }

      setMessage("");
      setEmail("");
      setFeedbackType("suggestion");

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });

      setIsOpen(false);
    } catch (error) {
      console.error(error);

      const errorMessage = axios.isAxiosError(error) && error.response
        ? error.response.data.message
        : "Failed to submit feedback. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg" size="icon">
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Open feedback form</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Send Feedback</SheetTitle>
          <SheetDescription>
            We value your input to improve our platform. Please share your thoughts with us.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="feedback-type">Feedback Type</Label>
            <RadioGroup
              id="feedback-type"
              value={feedbackType}
              onValueChange={setFeedbackType}
              className="flex flex-col space-y-1"
            >
              {[
                { value: "suggestion", label: "Suggestion" },
                { value: "issue", label: "Issue" },
                { value: "compliment", label: "Compliment" },
                { value: "other", label: "Other" },
              ].map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={value} />
                  <Label htmlFor={value}>{label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Please describe your feedback in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Provide your email if you&apos;d like us to follow up with you.</p>
          </div>

          <SheetFooter className="sm:justify-between">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </SheetFooter>
        </form>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <span className="text-sm text-foreground">Powered by </span>
          <Link
            href="https://github.com/Dhruv7Tripathi/Quizzer"
            target="_blank"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Quizzer
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}