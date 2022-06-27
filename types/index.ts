export interface Photo {
  albumId: number,
  id: number | string,
  thumbnailUrl: string,
  title: string,
  url: string
}
export interface Album {
  id: number | string,
  title: string,
  userId: number
}