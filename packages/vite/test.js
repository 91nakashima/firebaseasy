const { easyGetData } = require('@firebaseasy/firestore')
// import { easyGetData } from '@firebaseasy/firestore'

easyGetData('Test')
  .then(d => {
    console.log('成功')
    console.log(d)
  })
  .catch(err => {
    console.log('エラー')
    console.log.log(err)
  })
