import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: import.meta.env.VITE_SECRET_ID,
  SecretKey: import.meta.env.VITE_SECRET_KEY
})
export const uploadFile = (
  fileName: string,
  blob: Blob,
  onError: Function,
  onSuccess: Function
) => {
  cos.putObject(
    {
      Bucket: import.meta.env.VITE_BUCKET_NAME,
      Region: import.meta.env.VITE_REGION,
      Key: fileName,
      StorageClass: 'STANDARD',
      Body: blob,
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData))
      }
    },
    function (err, data) {
      if (err) {
        onError(err)
        return
      }
      // 上传成功
      onSuccess(data.Location)
    }
  )
}
