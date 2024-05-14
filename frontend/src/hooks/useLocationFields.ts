
import { getFilteredBarangays } from '@services/location-api-services/barangayService'
import { getFilteredDistricts } from '@services/location-api-services/districtService'
import { getFilteredMunicipalities } from '@services/location-api-services/municipalityService'
import { getFilteredProvinces } from '@services/location-api-services/provinceService'
import { getAllRegions } from '@services/location-api-services/regionService'
import React, {useContext, useEffect, useCallback, useMemo, memo, useState} from 'react'
import setNestedState from '@utils/setNestedState'
import isObjectEmpty from '@utils/isObjectEmpty'

export const useLocationFields = (props: any) => {
    const { 

        regionSelectorProps, setRegionSelectorProps,
        provinceSelectorProps, setProvinceSelectorProps,
        municipalitySelectorProps, setMunicipalitySelectorProps,
        barangaySelectorProps, setBarangaySelectorProps,
        districtSelectorProps, setDistrictSelectorProps,

        data, setData,

        regionFieldName, provinceFieldName, municipalityFieldName, barangayFieldName, districtFieldName
    } = props

      const [firstRender, setFirstRender] = useState(true);
    ////console.log("FIRST RENDER", firstRender)
    //////////////////////////////console.log("PROPS", props)
    //Region changed
  useEffect(() => {
    const retrieve = async () => {

        if(firstRender==false){setData((prev: any) => {
        return {
          ...prev,
          [provinceFieldName]: {},
          [municipalityFieldName]: {},
          [barangayFieldName]: {},
          [districtFieldName]: {}
        }
      })}

      //setMunicipalitySelectorDisabled(true)
      setNestedState(setBarangaySelectorProps, "disabled", true)
      setNestedState(setDistrictSelectorProps, "disabled", true)

      if(isObjectEmpty(data[regionFieldName]) == false) {
        //////////////console.log("r", data)
        if(data[regionFieldName].label == "NCR") {
            setNestedState(setProvinceSelectorProps, "visible", false)
            setNestedState(setMunicipalitySelectorProps, "loading", true)

            const retrievedCities: any = await getFilteredMunicipalities(data[regionFieldName]._id)

            setNestedState(setMunicipalitySelectorProps, "items", retrievedCities)
            setNestedState(setMunicipalitySelectorProps, "disabled", false)
            setNestedState(setMunicipalitySelectorProps, "loading", false)
        } else {
            setNestedState(setProvinceSelectorProps, "visible", true)
            setNestedState(setProvinceSelectorProps, "loading", true)
            setNestedState(setBarangaySelectorProps, "visible", true)
            setNestedState(setDistrictSelectorProps, "visible", false)

            const retrievedProvinces: any = await getFilteredProvinces(data[regionFieldName]._id) 
            setNestedState(setProvinceSelectorProps, "items", retrievedProvinces)
            setNestedState(setProvinceSelectorProps, "disabled", false)
            setNestedState(setMunicipalitySelectorProps, "disabled", true)
            setNestedState(setProvinceSelectorProps, "loading", false)
        }

        setNestedState(setBarangaySelectorProps, "disabled", true)

      } else {
        setNestedState(setProvinceSelectorProps, "visible", true)
        setNestedState(setProvinceSelectorProps, "disabled", true)
        setNestedState(setDistrictSelectorProps, "visible", false)
        setNestedState(setBarangaySelectorProps, "visible", true)
      }

    }

    retrieve()
  }, [data[regionFieldName]])

  //Province changed
  useEffect(() => {


    const retrieve = async () => {
        if(firstRender==false){setData((prev: any) => {
        return {
          ...prev,
          [municipalityFieldName]: {},
          [barangayFieldName]: {},
          [districtFieldName]: {}
        }
      })}

      setNestedState(setBarangaySelectorProps, "disabled", true)
      setNestedState(setDistrictSelectorProps, "disabled", true)

      if(isObjectEmpty(data[provinceFieldName]) == false) {
        setNestedState(setMunicipalitySelectorProps, "loading", true)
        const retrievedCities: any = await getFilteredMunicipalities(data[provinceFieldName]._id) 
        setNestedState(setMunicipalitySelectorProps, "items", retrievedCities)

        setNestedState(setMunicipalitySelectorProps, "disabled", false)
        setNestedState(setBarangaySelectorProps, "disabled", true)

        setNestedState(setMunicipalitySelectorProps, "loading", false)
          
      } else if (JSON.stringify(data[provinceFieldName])=="{}" && provinceSelectorProps.visible==true) {
        setNestedState(setMunicipalitySelectorProps, "disabled", true)
      }
    }

    retrieve()
  }, [data[provinceFieldName]])

  //Municipality changed
  useEffect(() => {


    const retrieve = async () => {
      if(firstRender==false) {
        setData((prev: any) => {
          return {
            ...prev,
            [barangayFieldName]: {},
            [districtFieldName]: {}
          }
        })
      }

      if(JSON.stringify(data[municipalityFieldName])!="{}") {
        if(data[municipalityFieldName].label=="CITY OF MANILA") {
            setNestedState(setBarangaySelectorProps, "visible", false)

            setNestedState(setDistrictSelectorProps, "visible", true)

            setNestedState(setDistrictSelectorProps, "visible", true)
            setNestedState(setDistrictSelectorProps, "loading", true)

            const retrievedDistricts: any = await getFilteredDistricts(data[municipalityFieldName]._id) 
            setNestedState(setDistrictSelectorProps, "items", retrievedDistricts)
            setNestedState(setDistrictSelectorProps, "disabled", false)
            setNestedState(setDistrictSelectorProps, "loading", false)

        } else {
            setNestedState(setDistrictSelectorProps, "visible", false)
            setNestedState(setBarangaySelectorProps, "visible", true)
            setNestedState(setBarangaySelectorProps, "loading", true)

            const retrievedBarangays: any = await getFilteredBarangays(data[municipalityFieldName]._id) 
            setNestedState(setBarangaySelectorProps, "items", retrievedBarangays)
            setNestedState(setBarangaySelectorProps, "disabled", false)
            setNestedState(setBarangaySelectorProps, "loading", false)

        }

        
      } else if(JSON.stringify(data[municipalityFieldName])=="{}") {
        setNestedState(setBarangaySelectorProps, "disabled", true)
        setNestedState(setDistrictSelectorProps, "disabled", true)
      }
    }

    retrieve()
  }, [data[municipalityFieldName]])

  useEffect(() => {
    const postRenderFunction = async () => {
        //////console.log("DATA HERE", data)
          const retrievedRegions : any = await getAllRegions()
          //////////////console.log("THE REGIONS", retrievedRegions)
          setNestedState(setRegionSelectorProps, "items", retrievedRegions)

        if(JSON.stringify(data[regionFieldName])!="{}") {

            if(data[regionFieldName].label == "NCR") {
                setNestedState(setProvinceSelectorProps, "visible", false)
                setNestedState(setMunicipalitySelectorProps, "disabled", false)


                setNestedState(setProvinceSelectorProps, "visible", false)
            } 

            else {

              setNestedState(setMunicipalitySelectorProps, "disabled", false)
              setNestedState(setBarangaySelectorProps, "disabled", false)
              setNestedState(setProvinceSelectorProps, "disabled", false)
              setNestedState(setRegionSelectorProps, "disabled", false)

            }

        }
        ////////////console.log("USEEPEK")
        setFirstRender(false) 



    }



    postRenderFunction()

  }, [])
}