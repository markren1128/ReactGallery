import React, { Component } from 'react';
import { GalleryItem } from './GalleryItem';
import { GalleryItemDetails } from './GalleryItemDetails';
import { Slider } from './Slider';

let arrayForHoldingImage = [];

export class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            perPage: 12,
            imageToShow: [],
            next: 0,
            selectedImage: null,
            showModal: false,
        };

        this.handleShowMoreImage = this.handleShowMoreImage.bind(this);
        this.loopWithSlice = this.loopWithSlice.bind(this);
        this.setModalShow = this.setModalShow.bind(this);
        this.setSelectedImage = this.setSelectedImage.bind(this);
    }

    componentDidMount() {
        this.populateData();
    }

    handleShowMoreImage() {
        this.loopWithSlice(this.state.next, this.state.next + this.state.perPage);
        this.setState({ next: this.state.next + this.state.perPage });
    };

    loopWithSlice(start, end){
        const slicedImage = this.state.data.slice(start, end);
        arrayForHoldingImage = [...arrayForHoldingImage, ...slicedImage];
        this.setState({ imageToShow: arrayForHoldingImage})
    };

    async populateData() {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const jsonData = await response.json();

        this.setState({
            data: jsonData,
            loading: false,
            perPage: 12,
            next: 13,
            showModal: false, 
        });
        this.loopWithSlice(0, this.state.perPage)
    }

    setModalShow(e) {
        let showModal = !this.state.showModal;
        this.setState({ showModal: showModal})

        if (showModal) {
            this.setSelectedImage(e.target);
        }
        else
        {
            this.setState({ selectedImage: null })
        }

    }

    setSelectedImage(target) {
        let id = target.id;
        let underScoreIndex = id.indexOf("_");
        id = id.substring(underScoreIndex + 1);
        let currentImage = this.state.imageToShow.find(x => x.id == id);

        this.setState({ selectedImage: currentImage })
    }

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : "";
        let items = null;
        let slider = <Slider text="Night Mode" />
        let loadMore = null;
        let modalPreview = null;

        if (this.state.next <= this.state.data.length) {
          loadMore = <button className="flex-alignItems-center btn-primary btn-margin" onClick={this.handleShowMoreImage}>Load more</button>;
        }

        if (this.state.imageToShow.length > 0) {
          items = this.state.imageToShow.map(o => {
                  return <GalleryItem
                      key={o.id}
                      id={o.id}
                      imgSrc={o.thumbnailUrl}
                      text={o.title}
                      value={o.id}
                      onClick={this.setModalShow}
                      />
          });
        }

        if (this.state.showModal && this.state.selectedImage != null) {
            modalPreview = <GalleryItemDetails
                key={this.state.selectedImage.id}
                id={this.state.selectedImage.id}
                selectedImage={this.state.selectedImage}
                onClick={this.setModalShow}
                isModalOpen={this.state.showModal}
            />
        }

        return (
            <div>
            <div id="header" className="flex-container-base flex-direction-row " style={{ padding: "1.6px" }}>
                <div id="header" className="flex-container-base flex-direction-column " style={{ padding: "1.6px" }}>
                    <h1 id="tabelLabel" >Gallery</h1>
                    <p>This component demonstrates fetching images from the a specific url.</p>
                    {contents}
                </div>
                {slider}
             </div>
            <div id="imageRows" className="flex-container-base flex-direction-column " style={{ padding: "1.6px" }}>
                <div className="flex-container flex-justifyContent-spaceAround" >
                        {items}
                        {modalPreview}
                </div>
            </div>
                {loadMore}
            </div>
        );
    }
}
