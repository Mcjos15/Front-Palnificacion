import React from "react";

class Botton extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { nombre: props.nombre }
  }
  render() {
    return (<input type="text"
      name='nombre' placeholder='Nombre'  required />);
  }
}
export default Botton;