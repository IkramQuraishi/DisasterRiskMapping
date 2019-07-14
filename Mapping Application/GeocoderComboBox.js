
Ext.define("GeoExt.form.field.GeocoderComboBoxPatched", {
  extend: "GeoExt.form.field.GeocoderComboBox",
  requires: ["GeoExt.form.field.GeocoderComboBox"],
  alias: "widget.gx_geocodercombo_patched",
  alternateClassName: "GeoExt.form.GeocoderComboBoxPatched",

  addMarkerWithText: function(point, text) {
    var markersLayers = this.map.getLayersByName("Markers");
    var markerLayer = null;
    var textLayers = this.map.getLayersByName("Text");
    var textLayer = null;
    if (markersLayers.length == 0) {
      markersLayer = new OpenLayers.Layer.Markers("Markers", {
        displayInLayerSwitcher: false
      });
      textLayer = new OpenLayers.Layer.Vector("Text", {
        displayInLayerSwitcher: false,
        styleMap: new OpenLayers.StyleMap({
          default: {
            
            label: "${name}",

            fontColor: "${favColor}",
            fontSize: "12px",
            fontFamily: "Courier New, monospace",
            fontWeight: "bold",
            labelAlign: "${align}",
            labelXOffset: "${xOffset}",
            labelYOffset: "${yOffset}",
            labelOutlineColor: "white",
            labelOutlineWidth: 1
          }
        }),
        renderers: renderer
      });
      this.map.addLayer(markersLayer);
      this.map.addLayer(textLayer);
    }
    else
    {
        markerLayer = markersLayers[0];
        textLayer = textLayers[0];
    }

    var size = new OpenLayers.Size(50, 50);
    var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
    var icon = new OpenLayers.Icon(
      "https://cdn.mapmarker.io/api/v1/pin?icon=fa-circle&size=35&background=157fcc&color=FFF&hoffset=-0.1",
      size,
      offset
    );
    var marker = new OpenLayers.Marker(point, icon);
    markersLayer.addMarker(marker);

    // allow testing of specific renderers via "?renderer=Canvas", etc
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = renderer
      ? [renderer]
      : OpenLayers.Layer.Vector.prototype.renderers;

    // create a point feature
    var pGeom = new OpenLayers.Geometry.Point(point.lon, point.lat);
    var pointFeature = new OpenLayers.Feature.Vector(pGeom);
    pointFeature.attributes = {
      name: text,
      favColor: "black",
      align: "cm",
     
      xOffset: 12,
     
      yOffset: -12
    };

    textLayer.drawFeature(pointFeature);
    textLayer.addFeatures([pointFeature]);
  },

 
  handleSelect: function(combo, rec) {
    if (!this.map) {
      this.findMapPanel();
    }
    var value = this.getValue();
    if (Ext.isArray(value)) {
      var mapProj = this.map.getProjectionObject();
      delete this.center;
      delete this.locationFeature;
      if (value.length === 4) {
        this.map.zoomToExtent(
          OpenLayers.Bounds.fromArray(value).transform(this.srs, mapProj)
        );
      } else {
        this.map.setCenter(
          OpenLayers.LonLat.fromArray(value).transform(this.srs, mapProj),
          Math.max(this.map.getZoom(), this.zoom)
        );
      }
      this.clearMarkersAndText();
      this.center = this.map.getCenter();
      this.addMarkerWithText(this.center, this.rawValue);
      
    }
  },
  clearMarkersAndText: function() {
      var markersLayers = this.map.getLayersByName("Markers");
      var textLayers = this.map.getLayersByName("Text");
      if (markersLayers.length > 0)
        markersLayers[0].clearMarkers();
      if (textLayers.length > 0)
        textLayers[0].removeAllFeatures();
  },

 
 /* clearResult: function() {
    if (this.center && !this.map.getCenter().equals(this.center)) {
      this.clearValue();
      this.clearMarkersAndText();
    }
  }
  */
});
