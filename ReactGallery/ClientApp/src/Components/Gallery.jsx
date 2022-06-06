import React, { Component } from 'react';
import { GalleryItem } from './GalleryItem';
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
    };

    this.handleShowMoreImage = this.handleShowMoreImage.bind(this);
    this.loopWithSlice = this.loopWithSlice.bind(this);
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
        selectedImage: "",
    });
    this.loopWithSlice(0, this.state.perPage)
}

render() {
      let contents = this.state.loading ? <p><em>Loading...</em></p> : "";
      let items = null;
      let slider = <Slider text= "Night Mode"/>
      let loadMore = null;
      
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
                      />
            });
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
            </div>
        </div>
            {loadMore}
        </div>
    );
  }
}
