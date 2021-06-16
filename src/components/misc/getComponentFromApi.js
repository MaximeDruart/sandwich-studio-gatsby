export default function getComponentFromApi(input) {
    switch(input.strapi_component){
        case "page.text-image-duo":
            return "DoubleImageText"
        case "page.headline":
            return "Headline"
        case "page.product-cards-container":
            return "Cards"
        case "page.selectedworks":
            return "SelectedWorks"
        case "forms.formcontact":
            return "Forms"
        case "page.imagebig":
            return "ImageBig"
        case "page.ctabanner":
            return "CtaBannerText"
        case "page.imageduo":
            return "ImageDuo"
        case "page.text-block":
            return "TextBlock"
        default:
            return "Headline"
    }
}