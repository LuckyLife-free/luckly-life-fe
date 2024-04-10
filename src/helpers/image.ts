import Compressor from 'compressorjs'

export type Image = {
  src: string
  name: string
}

export function compressImage(file: File) {
  return new Promise<File>((resolve) => {
    new Compressor(file, {
      maxWidth: 2000,
      maxHeight: 2000,
      convertSize: 1000000,
      quality: 0.8,
      success: (file) => resolve(file as File),
    })
  })
}

export function readImage(file: File) {
  return new Promise<Image>((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) =>
      resolve({src: e.target?.result as string, name: file.name})
    reader.readAsDataURL(file)
  })
}
