"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, ChevronRight, Lightbulb, RefreshCw } from "lucide-react"

// Content variables
const appTitle = "英語学習アプリ"
const welcomeMessage = "英語を楽しく学びましょう！"
const vocabularyTitle = "単語学習"
const quizTitle = "クイズ"
const progressTitle = "進捗"
const startQuizButton = "クイズを始める"
const nextButton = "次へ"
const checkAnswerButton = "答えを確認"
const tryAgainButton = "もう一度"
const correctMessage = "正解です！"
const incorrectMessage = "不正解です。もう一度挑戦してください。"
const hintLabel = "ヒント"

const vocabularyList = [
  { word: "Apple", translation: "りんご", example: "I eat an apple every day." },
  { word: "Book", translation: "本", example: "She loves to read books." },
  { word: "Cat", translation: "猫", example: "The cat is sleeping on the sofa." },
  { word: "Dog", translation: "犬", example: "He takes his dog for a walk every morning." },
  { word: "Elephant", translation: "象", example: "We saw a big elephant at the zoo." },
]

const quizQuestions = [
  { question: "What is the translation of 'Apple'?", answer: "りんご", options: ["バナナ", "りんご", "オレンジ", "ぶどう"] },
  { question: "Which word means '本' in English?", answer: "Book", options: ["Pen", "Book", "Notebook", "Magazine"] },
  { question: "Complete the sentence: 'The ___ is sleeping on the sofa.'", answer: "cat", options: ["dog", "cat", "bird", "fish"] },
  { question: "What's the correct translation of '犬'?", answer: "Dog", options: ["Cat", "Rabbit", "Dog", "Mouse"] },
  { question: "Which animal did we see at the zoo in the example sentence?", answer: "Elephant", options: ["Lion", "Giraffe", "Elephant", "Monkey"] },
]

export default function EnglishLearningApp() {
  const [activeTab, setActiveTab] = useState("vocabulary")
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const handleNextVocab = () => {
    setCurrentVocabIndex((prevIndex) => (prevIndex + 1) % vocabularyList.length)
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setScore(0)
  }

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setIsCorrect(null)
  }

  const handleCheckAnswer = () => {
    const correct = selectedAnswer === quizQuestions[currentQuestionIndex].answer
    setIsCorrect(correct)
    if (correct) {
      setScore((prevScore) => prevScore + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setSelectedAnswer("")
      setIsCorrect(null)
      setShowHint(false)
    } else {
      setQuizStarted(false)
    }
  }

  const calculateProgress = () => {
    return (score / quizQuestions.length) * 100
  }

  useEffect(() => {
    const timer = setInterval(handleNextVocab, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-800">{appTitle}</CardTitle>
          <CardDescription className="text-center text-lg">{welcomeMessage}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vocabulary">{vocabularyTitle}</TabsTrigger>
              <TabsTrigger value="quiz">{quizTitle}</TabsTrigger>
              <TabsTrigger value="progress">{progressTitle}</TabsTrigger>
            </TabsList>
            <TabsContent value="vocabulary">
              <Card>
                <CardHeader>
                  <CardTitle>{vocabularyTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentVocabIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold mb-2">{vocabularyList[currentVocabIndex].word}</h3>
                      <p className="text-lg mb-2">{vocabularyList[currentVocabIndex].translation}</p>
                      <p className="text-gray-600 italic">{vocabularyList[currentVocabIndex].example}</p>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleNextVocab} className="w-full">
                    <ChevronRight className="mr-2 h-4 w-4" /> {nextButton}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="quiz">
              <Card>
                <CardHeader>
                  <CardTitle>{quizTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizStarted ? (
                    <Button onClick={handleStartQuiz} className="w-full">
                      {startQuizButton}
                    </Button>
                  ) : (
                    <div>
                      <h3 className="text-xl font-bold mb-4">{quizQuestions[currentQuestionIndex].question}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === option ? "default" : "outline"}
                            onClick={() => handleSelectAnswer(option)}
                            className="w-full"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                      {isCorrect !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4"
                        >
                          {isCorrect ? (
                            <Badge variant="success" className="w-full justify-center py-2">
                              <CheckCircle2 className="mr-2 h-4 w-4" /> {correctMessage}
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="w-full justify-center py-2">
                              <AlertCircle className="mr-2 h-4 w-4" /> {incorrectMessage}
                            </Badge>
                          )}
                        </motion.div>
                      )}
                      <div className="mt-4 flex justify-between">
                        <Button onClick={() => setShowHint(!showHint)}>
                          <Lightbulb className="mr-2 h-4 w-4" /> {hintLabel}
                        </Button>
                        {isCorrect === null ? (
                          <Button onClick={handleCheckAnswer}>{checkAnswerButton}</Button>
                        ) : (
                          <Button onClick={handleNextQuestion}>
                            {currentQuestionIndex < quizQuestions.length - 1 ? nextButton : tryAgainButton}
                          </Button>
                        )}
                      </div>
                      {showHint && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 text-gray-600 italic"
                        >
                          Hint: Check the vocabulary list for the correct answer.
                        </motion.p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>{progressTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Quiz Score</h3>
                      <Progress value={calculateProgress()} className="w-full" />
                      <p className="text-sm text-gray-600 mt-1">
                        {score} out of {quizQuestions.length} correct
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Vocabulary Mastered</h3>
                      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                        {vocabularyList.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2">
                            <span>{item.word}</span>
                            <Badge variant="outline">{item.translation}</Badge>
                            <Separator className="my-2" />
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setActiveTab("vocabulary")} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" /> Review Vocabulary
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
