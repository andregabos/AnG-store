import React, { lazy, Suspense, useEffect } from "react";
import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../Redux/Shop/shop.actions";
import Spinner from "../../Components/Spinner/Spinner";

const CollectionOverviewContainer = lazy(() => import("../../Components/CollectionOverview/CollectionOverview.container"));
const CollectionContainer = lazy(() => import("../Collection/Collection.container"));


function Shop({ fetchCollectionsStart, match }) {

  useEffect(() => {
    fetchCollectionsStart();
  }, []);

  //const collectionRef = firestore.collection("collection");

  //API call using promisse + firebase.
  // collectionRef.get().then(snapshot => {
  //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   updateCollections(collectionsMap);
  //   this.setState({ loading: false });
  // });

  //Database access through Firebase methods, using observer pattern.
  // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
  //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   updateCollections(collectionsMap);
  //   this.setState({ loading: false });
  // });

  //More common fetch pattern example, without accessing the necessary data to be displayed.
  // fetch("https://firestore.googleapis.com/v1/projects/ang-clothing/databases/(default)/documents/collection")
  //   .then(response => response.json())
  //   .then(collection => console.log(collection))

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionContainer}
        />
      </Suspense>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});


export default connect(null, mapDispatchToProps)(Shop);