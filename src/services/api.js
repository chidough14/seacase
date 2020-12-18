import { Fetch } from "./fetch"


export const getCountries = async() =>{

  try {
    return await Fetch.fetch('countries')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}

export const getCommodities = async() =>{

  try {
    return await Fetch.fetch('commodities')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}

export const getRegions = async() =>{

  try {
    return await Fetch.fetch('regions')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}

export const getVesselGroups = async() =>{

  try {
    return await Fetch.fetch('vessel-groups')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}

export const getVesselTypes = async() =>{

  try {
    return await Fetch.fetch('vessel-types')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
export const getCarriers = async() =>{

  try {
    return await Fetch.fetch('carriers')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
export const getCompanies = async() =>{

  try {
    return await Fetch.fetch('companies')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
export const getVessels = async(name) =>{

  try {
    return await Fetch.fetch(`vessels?name=${name}`)
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
export const getCommodityHs6 = async() =>{

  try {
    return await Fetch.fetch('commodity-hs6')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
export const getCountryRegion = async() =>{

  try {
    return await Fetch.fetch('country-region')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
export const getVesselTypeVesselGroup = async() =>{

  try {
    return await Fetch.fetch('vessel-type-vessel-group')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
export const hs2 = async() =>{

  try {
    return await Fetch.fetch('hs2')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
export const hs4 = async() =>{

  try {
    return await Fetch.fetch('hs4')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
export const hs6 = async() =>{

  try {
    return await Fetch.fetch('hs6')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
export const ports = async() =>{

  try {
    return await Fetch.fetch('ports')
  } catch (error) {
    console.log(`API ERROR: ${ error.message }`)
    return []
  }

}
