"use client"

import { useState } from "react"
import { X, Copy, Check, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import axios from "axios"

interface ShareQuizModalProps {
  quizId: string
  quizTitle: string
  isOpen: boolean
  onClose: () => void
}

export function ShareQuizModal({ quizId, quizTitle, isOpen, onClose }: ShareQuizModalProps) {
  const [email, setEmail] = useState("")
  const [emails, setEmails] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const shareLink = `${window.location.origin}/takequiz/${quizId}?shared=true`

  const handleAddEmail = () => {
    if (email && !emails.includes(email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmails([...emails, email])
      setEmail("")
    } else if (email) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
    }
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((e) => e !== emailToRemove))
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    toast({
      title: "Link copied!",
      description: "Quiz link has been copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareQuiz = async () => {
    if (emails.length === 0) return

    setIsSharing(true)
    try {
      await axios.post("/api/quiz/share", {
        quizId,
        emails,
        quizTitle,
      })

      toast({
        title: "Quiz shared successfully!",
        description: `Quiz has been shared with ${emails.length} recipient${emails.length > 1 ? "s" : ""}`,
      })

      setEmails([])
      onClose()
    } catch (error) {
      console.error("Error sharing quiz:", error)
      toast({
        title: "Failed to share quiz",
        description: "There was an error sharing your quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Quiz</DialogTitle>
          <DialogDescription>Share your quiz &quot;{quizTitle}&quot; with specific users</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="email">Share via Email</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" readOnly value={shareLink} className="h-9" />
              </div>
              <Button size="sm" className="px-3" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Anyone with this link can access this quiz, even if they don&apos;t have an account.
            </p>
          </TabsContent>

          <TabsContent value="email" className="mt-4">
            <div className="grid gap-4">
              <div className="flex items-end gap-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddEmail()
                      }
                    }}
                  />
                </div>
                <Button onClick={handleAddEmail}>Add</Button>
              </div>

              {emails.length > 0 && (
                <div className="border rounded-md p-3">
                  <p className="text-sm font-medium mb-2">Recipients:</p>
                  <div className="flex flex-wrap gap-2">
                    {emails.map((email) => (
                      <div
                        key={email}
                        className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                      >
                        {email}
                        <button
                          onClick={() => handleRemoveEmail(email)}
                          className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-between">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          {emails.length > 0 && (
            <Button onClick={handleShareQuiz} disabled={isSharing} className="gap-2">
              {isSharing ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sharing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Share
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

