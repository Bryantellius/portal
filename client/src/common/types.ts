export interface IRole {
  id: number,
  title: string,
  access: number
}

export interface IAppUser {
  id: number,
  roleId: number,
  lastLectureId: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  avatarUrl: string,
  Role?: IRole,
  course?: string,
  updatedAt: string,
  createdAt: string
}
