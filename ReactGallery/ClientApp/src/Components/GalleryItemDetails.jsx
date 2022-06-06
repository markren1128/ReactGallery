import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'

export class GalleryItemDetails extends Component {
    constructor(props) {
        super(props);

        this.setModalShow = this.setModalShow.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    setModalShow() {

    }

    render() {
        debugger
        let image = null;
        if (this.props.imgSrc !== null) {
            image = (<img className="imageCls" src={this.props.imgSrc} />);
        }

        var css = "mobileGraphicalTileButton ";
        css = this.props.classes ? css + this.props.classes : css;
        var styles = this.props.styles

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                </Modal.Footer>
            </Modal>
        );
    };
}