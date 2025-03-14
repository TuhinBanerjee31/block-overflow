import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  MessageCircle,
  Wallet,
  Coins,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useWallet } from "../context/WalletContext";

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [questionContent, setQuestionContent] = useState("");
  const [bounty, setBounty] = useState("");
  const [loadingState, setLoadingState] = useState({
    questions: false,
    answers: {},
    transaction: false,
  });

  const { contract, account } = useWallet();

  const fetchQuestions = async () => {
    if (!contract) return;

    setLoadingState((prev) => ({ ...prev, questions: true }));
    try {
      const questionCount = await contract.questionCount();
      const fetchedQuestions = await Promise.all(
        Array.from({ length: Number(questionCount) }, (_, i) =>
          contract.questions(i).then((q) => ({
            id: Number(q.id),
            content: q.content,
            author: q.author,
            bounty: ethers.formatEther(q.bounty),
            answered: q.answered,
          }))
        )
      );
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load questions");
    }
    setLoadingState((prev) => ({ ...prev, questions: false }));
  };

  const fetchAnswers = async (id) => {
    if (!contract || !id) return;

    // If answers exist for this question, hide them by removing from state
    if (answers[id]) {
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers[id];
        return newAnswers;
      });
      return;
    }

    // Otherwise, fetch and show answers
    setLoadingState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [id]: true },
    }));
    try {
      const fetchedAnswers = await contract.getAnswers(id);
      const formattedAnswers = fetchedAnswers.map((a) => ({
        id: Number(a.id),
        content: a.content,
        author: a.author,
        accepted: a.accepted,
        questionId: Number(a.questionId),
      }));
      setAnswers((prev) => ({ ...prev, [id]: formattedAnswers }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load answers");
    }
    setLoadingState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [id]: false },
    }));
  };

  const postQuestion = async () => {
    if (!questionContent || !bounty) {
      toast.warn("Please fill all fields");
      return;
    }
    if (!contract) {
      toast.error("Please connect wallet first");
      return;
    }

    setLoadingState((prev) => ({ ...prev, transaction: true }));
    try {
      const tx = await contract.postQuestion(questionContent, {
        value: ethers.parseEther(bounty),
      });
      await tx.wait();
      toast.success("Question posted!");
      setQuestionContent("");
      setBounty("");
      fetchQuestions();
    } catch (error) {
      console.error(error);
      toast.error("Transaction failed");
    }
    setLoadingState((prev) => ({ ...prev, transaction: false }));
  };

  useEffect(() => {
    fetchQuestions();
  }, [contract, account]);

  return (
    <main
      className="w-full min-h-screen px-4 pt-30 pb-8 bg-[#eff4fe]"
      style={{ fontFamily: "Barlow" }}
    >
      {loadingState.transaction && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl flex items-center space-x-4">
            <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
            <span className="text-gray-700 font-medium">
              Processing Transaction...
            </span>
          </div>
        </div>
      )}

      <div className="space-y-6 max-w-screen-lg mx-auto">
        <div className="p-6 rounded-lg shadow-sm">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Post Your Question
          </h2>
          <div className="space-y-4">
            <textarea
              placeholder="What's your question?"
              value={questionContent}
              onChange={(e) => setQuestionContent(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg outline-none"
              rows={4}
            />
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Bounty (ETH)"
                value={bounty}
                onChange={(e) => setBounty(e.target.value)}
                className="flex-1 p-3 border border-slate-300 rounded-lg outline-none"
              />
              <button
                onClick={postQuestion}
                disabled={loadingState.transaction}
                className="flex items-center px-6 py-3 bg-[#5150db] text-white rounded-lg hover:bg-[#4541c1] cursor-pointer disabled:bg-indigo-400 transition-all duration-200"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Post
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {loadingState.questions ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
            </div>
          ) : questions.length > 1 ? (
            questions.map(
              (q, index) =>
                index != 0 && (
                  <div
                    key={q.id}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Q#{q.id}: {q.content}
                        </h3>
                        <div className="mt-2 flex space-x-4 text-sm text-gray-600">
                          <span>
                            <Wallet className="h-4 w-4 inline mr-1" />{" "}
                            {q.author.slice(0, 6)}...{q.author.slice(-4)}
                          </span>
                          <span>
                            <Coins className="h-4 w-4 inline mr-1" /> {q.bounty}{" "}
                            ETH
                          </span>
                          <span>
                            <CheckCircle2
                              className={`h-4 w-4 inline mr-1 ${
                                q.answered ? "text-green-500" : "text-gray-400"
                              }`}
                            />
                            {q.answered ? "Answered" : "Open"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => fetchAnswers(q.id)}
                      className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      {answers[q.id] ? "Hide Answers" : "Show Answers"}
                    </button>
                    {loadingState.answers[q.id] ? (
                      <div className="mt-4 flex justify-center">
                        <Loader2 className="animate-spin h-5 w-5 text-indigo-600" />
                      </div>
                    ) : (
                      answers[q.id] && (
                        <div className="mt-4 space-y-3">
                          {answers[q.id].map((answer) => (
                            <div
                              key={answer.id}
                              className={`p-4 rounded-lg ${
                                answer.accepted ? "bg-green-50" : "bg-gray-50"
                              }`}
                            >
                              <p className="text-gray-800">{answer.content}</p>
                              <div className="mt-2 flex justify-between text-sm text-gray-600">
                                <span>
                                  <Wallet className="h-4 w-4 inline mr-1" />{" "}
                                  {answer.author.slice(0, 6)}...
                                  {answer.author.slice(-4)}
                                </span>
                                {answer.accepted && (
                                  <span className="text-green-600">
                                    ✓ Accepted
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )
            )
          ) : (
            <div className="text-center text-2xl py-10 text-gray-600 uppercase">
              {account
                ? "No questions yet"
                : "Connect wallet to view questions..."}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default QuestionsPage;
