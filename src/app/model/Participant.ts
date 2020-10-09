export interface Participant {
  name: string;
  isReady: boolean;
  hash: string;
  answerLocked: boolean;
  showingAnswers: boolean;
  answeredCorrectly: boolean;
}
