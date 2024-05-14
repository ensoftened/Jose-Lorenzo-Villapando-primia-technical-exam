const isPhotoEmpty = (photo: any) => {

    if(photo) return Object.keys(photo).length === 0 && photo.constructor === Object

    return true
}


export default isPhotoEmpty