export type ProjectType = {
  id: number,
  name: string,
  description: string,
  owner: string,
  visibility: 'PRIVATE' | 'PUBLIC'
}
