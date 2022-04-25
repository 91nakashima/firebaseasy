import { easyConnect } from '@firebaseasy/firestore'

export const dbTest = easyConnect<{ id: string; text: string }>('Test')
