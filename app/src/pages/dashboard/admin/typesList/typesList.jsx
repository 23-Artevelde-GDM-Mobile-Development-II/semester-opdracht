import React, { useEffect, useState } from 'react';
import styles from './typesList.module.css';
import DashboardAccountSidebar from '../../../../components/Global/sidabars/dashboardAccountSidebar/dashboardAccountSidebar';
import SIDEBAR_NAV_ITEMS from '../../../../consts/sidebarNavItems';
import RegularTable from '../../../../components/Global/tables/regularTable/regularTable';
import PopupSearch from '../../../../components/Global/popups/popupSearch/popupSearch';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../../components/Global/loading/loading';
import Popup from '../../../../components/Global/popups/popup/popup';
import InputWithLabel from '../../../../components/Global/formInputs/input/inputWithLabel/inputWithLabel';
import SelectWithLabel from '../../../../components/Global/formInputs/select/selectWithLabel/selectWithLabel';

function TypesList() {

  const [data, setData] = useState({
    types: [],
    subtypes: [],
  });

  const [formDataPopupNewType, setFormDataPopupNewType] = useState('');
  const [formDataPopupNewSubType, setFormDataPopupNewSubType] = useState({
    subtype: '',
    typeId: data.types[0]
  });

  console.log(data.types, 'data.types[0]')

//   Get all types
  const {
    isLoading: isLoadingTypes,
    error: errorTypes,
    invalidate: invalidateTypes,
    data: typesData,
  } = useFetch(`/realEstates/types`);

//   Get all subtypes
  const {
    isLoading: isLoadingSubtype,
    error: errorSubtype,
    invalidate: invalidateSubtype,
    data: subtypesData,
  } = useFetch(`/realEstates/subTypes`);

  useEffect(() => {
    let isActive = true;
    if (typesData && isActive) {
      const types = typesData.map((type) => ([
        type._id,
        type.type,
      ]));

      setData((prevData) => ({ ...prevData, types }));
    }

    return () => isActive = false;
  }, [typesData]);

  useEffect(() => {
    if (subtypesData) {
      const subtypes = subtypesData.map((subtype) => ([
        subtype._id,
        data.types.find((type) => type.id === subtype.typeId)?.type || '',
        subtype.subtype
      ]));

      setData((prevData) => ({ ...prevData, subtypes }));
    }
  }, [subtypesData, data.types]);


  function openPopup() {
    document.querySelector('dialog').showModal();
  }

  function handleUpdateFormPopupType(event){
    const {value} = event.target
        setFormDataPopupNewType(value)
  }

  function handleUpdateFormPopupSubType(event){
    const {name, value} = event.target;
    
    setFormDataPopupNewSubType(prevFormData => {
        return {
            ...prevFormData,
            [name] : value
        }
    })
  }

  if (isLoadingSubtype || isLoadingTypes) {
    return <Loading />;
  } else {
    return (
      <div>
        {/* Popup to search users that you can add to this agency */}
        <Popup>
            <h2>Voeg een catagorie of een subcategorie toe</h2>
            {
                (errorSubtype || errorSubtype) &&

                <p>Er is iets midgelopen.</p>
            }

            <form>
                <h4>Categorie</h4>
                <InputWithLabel name={"type"} labelText={"Categorie naam"} inputType={"text"} handleChange={handleUpdateFormPopupType} value={formDataPopupNewType}/>

                <button className={styles.secondaryBtn}>Voeg de subcategorie toe</button>
            </form>

            <hr className="line" />

            <form>
                <h4>Subcategorie</h4>
                <SelectWithLabel options={data.types.map((type)=>(
                    {label: type[1], value: type[0]}
                ))} activeOption={formDataPopupNewSubType.typeId !== '' ? formDataPopupNewSubType.typeId : data.types[0]} name={"typeId"} labelText={"Kies een hoofdcategorie"} handleChange={handleUpdateFormPopupSubType}/>

                <InputWithLabel name={"subtype"} labelText={"Subcategorie naam"} inputType={"text"} handleChange={handleUpdateFormPopupSubType} value={formDataPopupNewSubType.subtype}/>

                <button className={styles.secondaryBtn}>Voeg de subcategorie toe</button>
            </form>
            
        </Popup>

        <div className={styles.container}>
          <div className={styles.sidebar}>
            <DashboardAccountSidebar
              navItems={SIDEBAR_NAV_ITEMS.dashboard.admin}
              activeItem={'Categorieën'}
            />
          </div>

          {errorSubtype || errorTypes ? (
            <p>Er is iets misgelopen.</p>
          ) : (
            <main className={styles.employeesContainer}>
              <div className={styles.justifyBetween}>
                <h1>Categorieën en subcategorieën</h1>
                <button
                  className={styles.secondaryBtn}
                  onClick={openPopup}
                >
                  Nieuw
                </button>
              </div>

              <div className={styles.tablesContainer}>
                <RegularTable
                  columnNames={['Categorieën']}
                  data={data.types}
                  removeOnly={true}
                  usersTable={false}
                  deleteAction={"deleteType"}
                />

                <RegularTable
                  columnNames={['HoofdCategorieën', 'SubCategorieën']}
                  data={data.subtypes}
                  removeOnly={true}
                  deleteAction={"deleteSubtype"}
                />
              </div>
            </main>
          )}
        </div>
      </div>
    );
  }
}

export default TypesList;
