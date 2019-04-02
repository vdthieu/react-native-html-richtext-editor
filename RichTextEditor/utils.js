
export function convertRgbToInt(rgbString) {
    if(rgbString.startsWith('#')){
        rgbString.splice(0,1)
    }
    if(rgbString.length === 3){
        rgbString = `${rgbString[0]}${rgbString[0]}${rgbString[1]}${rgbString[1]}${rgbString[2]}${rgbString[2]}`
    }
}