export type AddPracticeType = {
  name: string,
  description: string,
  type: 'STANDARD' | 'QUIZ',
  projectId: number,
  collectionIds: number[]
}
