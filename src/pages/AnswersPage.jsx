import { useState } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useWallet } from '../context/WalletContext';

import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { QuestionCard } from "../components/answers/QuestionCard";
import { AnswersHeader } from "../components/answers/AnswersHeader";
import { AnswerCard } from "../components/answers/AnswerCard";
import { AnswerInput } from "../components/answers/AnswerInput";
import { NavigationButtons } from "../components/answers/NavigationButtons";
import { answersData } from "@/data/answersData";


function AnswerPage() {
  const [answerContent, setAnswerContent] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [loading, setLoading] = useState(false);

  const { contract } = useWallet();

  const postAnswer = async () => {
    if (!answerContent || !questionId) {
      toast.warn('Please fill all fields');
      return;
    }
    if (!contract) {
      toast.error('Please connect wallet first');
      return;
    }

    setLoading(true);
    try {
      const tx = await contract.postAnswer(questionId, answerContent);
      await tx.wait();
      toast.success('Answer posted!');
      setAnswerContent("");
      setQuestionId("");
    } catch (error) {
      console.error(error);
      toast.error('Transaction failed');
    }
    setLoading(false);
  };

  return (
    <main className="px-4 py-8  min-h-screen">
      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl flex items-center space-x-4">
            <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
            <span className="text-gray-700 font-medium">Processing Transaction...</span>
          </div>
        </div>
      )}

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground">
                <ArrowLeft className="size-4" />
                <span>Back to Questions</span>
              </Link>
            </Button>
          </motion.div>

          {/* Question & Answers Section */}
          <QuestionCard />
          <div className="mb-8">
            <AnswersHeader />
            {answersData.map((answer, index) => (
              <AnswerCard key={answer.id} answer={answer} index={index} />
            ))}
          </div>

          {/* Answer Submission Form (Replaces AnswerInput) */}
          <div className="max-w-screen-lg mx-auto p-6 rounded-lg shadow-sm bg-white">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Put Your Answer</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Question ID"
                value={questionId}
                onChange={(e) => setQuestionId(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <textarea
                placeholder="Your answer"
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
              />
              <button
                onClick={postAnswer}
                disabled={loading}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-all duration-200"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Submit Answer
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <NavigationButtons />
        </div>
      </div>
    </main>
  );
}

export default AnswerPage;