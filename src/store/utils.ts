import Answer from "@/cls/model/Answer";

export function getTotalAnswers(answers: any[]): number {
  let total = 0;
  console.log(answers);
  for (const answer of answers) {
    total += (answer as any).votes;
  }
  return total;
}

export function getAnswers(responseAnswers: any[]): Answer[] {
  const answers: Answer[] = [];
  for (const responseAnswer of responseAnswers) {
    answers.push(
      new Answer({
        id: responseAnswer.id,
        answerText: responseAnswer.answer_text,
        votes: responseAnswer.votes,
      })
    );
  }
  return answers;
}
