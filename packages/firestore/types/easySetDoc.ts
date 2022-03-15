import { Timestamp } from 'firebase/firestore'

export interface EasySetDoc {
  id?: string
  created_at?: Date | Timestamp
  updated_at?: Date | Timestamp
}
