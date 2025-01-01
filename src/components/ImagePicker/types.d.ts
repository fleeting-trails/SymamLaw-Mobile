namespace PropTypes {
    type AvatarImagePicker = {
        existingImage?: string,
        onUpload?: (res: null | {
            result: import('expo-image-picker').ImagePickerResult,
            blob: Blob
        }) => void
    }
}