import defaultCover from '@/assets/cover.jpg'
import defaultUser from '@/assets/user.svg'

export {defaultCover, defaultUser}

export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
