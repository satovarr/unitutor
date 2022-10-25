import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { InputGroup } from "../components/InputGroup";
import book from "../imgs/book.svg";
import Input from "../components/Input";
import "../styles/TutorshipsCreate.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

//services
import { getCategories, getSubcategories } from "../services/categories";
import Modal from "../components/Modal";
import { createTutorship } from "../services/tutorships";
import { useContext } from "react";
import { UserContext } from "../App";
import { getUserPublicId } from "../services/users";

const Tutorships_Create = () => {
  const [modalParams, setModalParams] = useState();
  const [errorMessageObj, setErrorMessageObj] = useState({});
  const [formInfo, setFormInfo] = useState({});
  const [categories, setCategories] = useState(null);
  //object that contains selected category and its subcategories
  const [selectedCat_subcats, setSelectedCat_subcats] = useState(null);

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  //Redirect to home if there isn't an active session
  useEffect(() => {
    if (localStorage.getItem("activeSession") === "false") {
      navigate("/");
    }
  }, [navigate]);

  //Get categories info
  useEffect(() => {
    if (!categories) {
      getCategories()
        .then((response) => {
          setCategories(response);
          setSelectedCat_subcats({ ...selectedCat_subcats, loading: true });
        })
        .catch(() => {
          handleModalChange({
            active: true,
            isSucessState: true,
            success: false,
            message: "Ha ocurrido un error :(",
            message_description:
              "Revisa tu conexión a internet o intenta de nuevo más tarde",
            isCloseable: true,
            acceptButtonText: "Vale",
          });
        });
    }
  }, []);

  //Get subcategories info
  useEffect(() => {
    if (formInfo.category !== "") {
      if (
        !selectedCat_subcats ||
        formInfo.category !== selectedCat_subcats.category
      ) {
        getSubcategories(formInfo.category)
          .then((response) => {
            setSelectedCat_subcats({
              category: formInfo.category,
              subcategories: response,
              loading: false,
            });
          })
          .catch(() => {
            handleModalChange({
              active: true,
              isSucessState: true,
              success: false,
              message: "Ha ocurrido un error :(",
              message_description:
                "Revisa tu conexión a internet o intenta de nuevo más tarde",
              isCloseable: true,
              acceptButtonText: "Vale",
            });
          });
      }
    } else {
      setSelectedCat_subcats(null);
    }
  }, [formInfo]);

  //Function to set modal params
  const handleModalChange = (params) => {
    setModalParams(params);
  };

  const onPriceChange = ({ target }) => {
    if (/^\d*$/.test(target.value) && target.value.length <= 6) {
      setFormInfo({ ...formInfo, price: parseInt(target.value) || "" });
    }
  };

  const onTextChange = ({ target }) => {
    let trimmedText_start = target.value.trimStart();
    setFormInfo({ ...formInfo, [target.name]: trimmedText_start });
  };

  const onTextBlur = ({ target }) => {
    if (formInfo[target.name]) {
      setFormInfo({
        ...formInfo,
        [target.name]: formInfo[target.name].trimEnd(),
      });
    }
    setErrorMessageObj({
      ...errorMessageObj,
      [target.name]:
        formInfo[target.name] === "" ? "Debes rellenar este campo" : null,
    });
  };

  const onOptionChange = ({ target }) => {
    //Only change states if the options are different
    if (formInfo[target.name] !== target.value) {
      //Clean subcategory selection if category changes
      if (target.name === "category") {
        setFormInfo({
          ...formInfo,
          [target.name]: target.value,
          subcategory: undefined,
        });
      } else {
        setFormInfo({ ...formInfo, [target.name]: target.value });
      }
    }
  };

  const onOptionBlur = ({ target }) => {
    setErrorMessageObj({
      ...errorMessageObj,
      [target.name]:
        formInfo[target.name] === "" ? "Debes rellenar este campo" : null,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO: change public id later
    let tokenObject = { accessToken: currentUser?.accessToken };
    getUserPublicId(tokenObject).then((public_id) => {
      if (public_id) {
        //code goes here
        let tutorshipData = {
          category_id: formInfo.category,
          subcategory_id: formInfo.subcategory,
          public_id,
          name: formInfo.name,
          ut_value: formInfo.price,
          description: formInfo.description,
        };
        createTutorship(tutorshipData).then((response) => {
          if (response) {
            handleModalChange({
              active: true,
              isSucessState: true,
              success: true,
              message: "Creación exitosa",
              message_description:
                "Tu tutoría se ha creado correctamente! Volviendo a mis tutorías...",
            });
            setTimeout(() => navigate("/tutorships"), 4000);
          }
        });
      } else {
        handleModalChange({
          active: true,
          isSucessState: true,
          success: false,
          message: "Ha ocurrido un error :(",
          message_description:
            "Revisa tu conexión a internet o intenta de nuevo más tarde",
          isCloseable: true,
          acceptButtonText: "Vale",
        });
      }
    });
  };

  const allowContinue = () => {
    return (
      formInfo?.name !== "" &&
      formInfo.category &&
      formInfo.category !== "" &&
      formInfo.subcategory &&
      formInfo.subcategory !== "" &&
      formInfo.description &&
      formInfo.description !== "" &&
      formInfo.price &&
      formInfo.price !== ""
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="tutorshipForm page">
      <Modal {...modalParams} handleModalChange={handleModalChange} />
      <Navbar />
      <div className="tutorship-form container">
        <h1>
          <img src={book} alt="" />
          Crear Tutoría
        </h1>
        <form className="tutorship-form content" onSubmit={handleSubmit}>
          <div className="tutorship-form field">
            <h2>Nombre</h2>
            <InputGroup
              label="¿Qué Nombre le quieres dar a la tutoría?"
              id="name"
              placeholder="Nombra la tutoría"
              type="text"
              name={"name"}
              value={formInfo.name}
              onChange={onTextChange}
              error={errorMessageObj.name}
              onBlur={onTextBlur}
            />
          </div>
          <div className="tutorship-form field">
            <h2>Categoría</h2>
            <InputGroup
              label="¿A qué categoría y subcategoría pertenece la tutoría que quieres ofertar?"
              id="category"
              placeholder={
                categories
                  ? "Selecciona una categoría"
                  : "Cargando categorías..."
              }
              type="select"
              name={"category"}
              value={formInfo.category}
              error={errorMessageObj.category}
              onChange={onOptionChange}
              options={
                categories
                  ? categories.map((category) => ({
                      value: category.cat_id,
                      display: category.name,
                    }))
                  : null
              }
              onBlur={onOptionBlur}
            />
            <Input
              id="subcategory"
              placeholder={
                selectedCat_subcats?.category
                  ? selectedCat_subcats.loading
                    ? "Cargando subcategorías..."
                    : "Selecciona una subcategoría"
                  : "Esperando por categoría..."
              }
              type="select"
              name={"subcategory"}
              value={formInfo.subcategory}
              error={errorMessageObj.subcategory}
              onChange={onOptionChange}
              options={
                !selectedCat_subcats?.subcategories ||
                selectedCat_subcats?.loading
                  ? null
                  : selectedCat_subcats.subcategories.map((subcategory) => ({
                      value: subcategory.subcat_id,
                      display: subcategory.name,
                    }))
              }
              onBlur={onOptionBlur}
            />
          </div>

          <div className="tutorship-form field">
            <h2>Descripción</h2>
            <label htmlFor="description">Describe brevemente la tutoría</label>
            <textarea
              id="description"
              maxLength="250"
              className="input"
              placeholder="Describe la tutoría"
              value={formInfo.description}
              onChange={onTextChange}
              name="description"
            />
          </div>

          <div className="tutorship-form field">
            <h2>Precio</h2>
            <InputGroup
              label="Finalmente, pónle precio por hora a la tutoría"
              id="price"
              placeholder="Precio por hora de la tutoría"
              type="text"
              name={"price"}
              error={errorMessageObj.price}
              value={formInfo.price}
              onChange={onPriceChange}
            />
          </div>

          <div className="tutorship-form actions">
            <Button
              text={"Volver"}
              type={"Secondary"}
              additionalClass={"back"}
              htmlType={"button"}
              handleClick={goBack}
            />
            <Button
              text={"Crear Tutoría"}
              type={"Primary"}
              disabled={!allowContinue()}
            />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Tutorships_Create;
