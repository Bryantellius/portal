export interface IRole {
  id: number,
  title: string,
  access: number
}

export interface IAppUser {
  id: number,
  lastLectureId?: number,
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
  avatarUrl?: string,
  role?: IRole,
  course?: string,
  updatedAt?: string,
  createdAt?: string
}
