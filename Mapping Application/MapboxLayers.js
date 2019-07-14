Ext.require([
  "Ext.container.Viewport",
  "Ext.panel.Panel",
  "Ext.layout.container.Border",
  "GeoExt.tree.Panel",
  "Ext.tree.plugin.TreeViewDragDrop",
  "GeoExt.panel.Map",
  "GeoExt.tree.OverlayLayerContainer",
  "GeoExt.tree.BaseLayerContainer",
  "GeoExt.data.LayerTreeModel",
  "GeoExt.panel.Legend",
  "GeoExt.container.WmsLegendPatched",
  "GeoExt.tree.View",
  "GeoExt.tree.Column",
  "GeoExt.OverviewMap",

  "Ext.util.Point",
  "GeoExt.data.FeatureStore",
  "GeoExt.grid.column.Symbolizer",
  "GeoExt.selection.FeatureModel",
  "Ext.grid.GridPanel",
  "GeoExt.panel.Map",
  "GeoExt.form.field.GeocoderComboBoxPatched",
  "GeoExt.window.Popup"
]);

Ext.application({
  name: "Tree Legend",
  launch: function() {
    var layerSet1 = [
     new OpenLayers.Layer.XYZ(
        'Streets',
       
        ['https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
     
        {
          sphericalMercator: true,
       
          wrapDateLine: true,
         displayInLayerSwitcher: false,
          
               
               
        }
      ),
     new OpenLayers.Layer.XYZ(
        'SatelliteImagery',
       
        ['https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
     
        {
          sphericalMercator: true,
         
          wrapDateLine: true,
         displayInLayerSwitcher: false
        }
      ),
     new OpenLayers.Layer.XYZ(
        'Population Density (Person/Sq.km)',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxyb505v0cyw1cnyu18qnr7v/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
          displayInLayerSwitcher: true,
          legend: 'legend/Population.png'
           
          
        }
      ),

new OpenLayers.Layer.XYZ(
        'Hirat_Land_Cover',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxie786s4aah1cldil0ratwk/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
          displayInLayerSwitcher: true,
          legend: 'legend/LandCover.png'
          
        }
      ),


new OpenLayers.Layer.XYZ(
        'GSM Coverage',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxy82ggu042r1cpnogbn1oa3/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
          displayInLayerSwitcher: true,
          legend: 'legend/GSM.png'
          
        }
      ),


new OpenLayers.Layer.XYZ(
        'Flood Exposure Risk',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxy6tpcs02zl1co3kcn66jk6/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
          displayInLayerSwitcher: true,
          legend: 'legend/Flood.png'

          
        }
      ),
new OpenLayers.Layer.XYZ(
        'Settlements',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxy6tw160kre1co5p9evyxg2/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
          displayInLayerSwitcher: true,
          legend: 'legend/Settlements.png'
          
        }
      ),
new OpenLayers.Layer.XYZ(
        'Primary School',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxy6m06x09241co0ix03f4u0/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
          displayInLayerSwitcher: true,
          legend: 'legend/PrimarySchool.png'
          
        }
      ),
new OpenLayers.Layer.XYZ(
        'Secondary School',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxy65s0b0k2t1cnyvcz9webz/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
          displayInLayerSwitcher: true,
          legend: 'legend/SecondarySchool.png'
          
        }
      ),
new OpenLayers.Layer.XYZ(
        'High School',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxy6m78e0kjx1cmzmhaie5iz/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
          displayInLayerSwitcher: true,
          legend: 'legend/HighSchool.png'

          
        }
      ),

 new OpenLayers.Layer.XYZ(
        'Health Facilities Tier 3',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxy4tcxh07601co2g0j3fkk4/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
          displayInLayerSwitcher: true,
          legend: 'legend/HealthFacility3.png'
          
        }
      ),

   new OpenLayers.Layer.XYZ(
        'Health Facilities Tier 1',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxy4h4fd0inn1cmrfyqpa215/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
           displayInLayerSwitcher: true,
          legend: 'legend/HealthFacility1.png'
          
        }
      ),

  

   new OpenLayers.Layer.XYZ(
        'Airports / Helipad',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxx4o3m9085e1cnz9530vxb6/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
           displayInLayerSwitcher: true,
          legend: 'legend/Airports.png'
          
        }
      ),
new OpenLayers.Layer.XYZ(
        'AllHeartDistrict',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxy4cz6a00oj1cpnifs8j3xu/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
               displayInLayerSwitcher: false
          
        }
      ),

   new OpenLayers.Layer.XYZ(
        'Road Network',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxx4ew4a19nc1cpo08claukn/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
           displayInLayerSwitcher: true,
          legend: 'legend/RoadNetwork.png'
          
        }
      ),


    
     new OpenLayers.Layer.XYZ(
        'District Boundary',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjy2o2flu1xm41crw2yc5b9gm/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
          displayInLayerSwitcher: true,
          legend: 'legend/DistrictBoundary.png'
          
  
        }
      ),
     new OpenLayers.Layer.XYZ(
        'Guzara Pashtunzarghun Districts',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjy2ny6na1xla1cqr7jdt2d9v/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
            displayInLayerSwitcher: true,
          legend: 'legend/GuzarahPashtunzarghunDistrict.png'
     
          
        }
      ), 
      new OpenLayers.Layer.XYZ(
        'lable',
        ['https://api.mapbox.com/styles/v1/habibaatify/cjxyboy3o0pe81clyfppyit0w/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoiaGFiaWJhYXRpZnkiLCJhIjoiY2pxbjkwMjZ6MDNyZTQ5cGp3cjE0b2g0dCJ9.OYlJng5XGhuFW1Cz5DNNjw'],
        {
          sphericalMercator: true,
          wrapDateLine: true,
            displayInLayerSwitcher: false
        }
      ),
    ];


 layerSet1[2].setVisibility(false); 
     layerSet1[3].setVisibility(false); 
     layerSet1[4].setVisibility(false); 
   
     layerSet1[6].setVisibility(false); 
     layerSet1[7].setVisibility(false); 
     layerSet1[8].setVisibility(false); 
     layerSet1[9].setVisibility(false); 
     layerSet1[10].setVisibility(false); 
      layerSet1[11].setVisibility(false); 
    layerSet1[12].setVisibility(false); 
         layerSet1[14].setVisibility(false);


    var mapPanel = Ext.create("GeoExt.MapPanel", {
      region: "center",

   
     center: [6920524.79, 4042008.44],

      zoom: 10,
      layers: layerSet1
    });

     mapPanel.map.addControl(new OpenLayers.Control.MousePosition({
      prefix: '<span style="color:#000;font-size:12px;">' +
      'EPSG:3857 Lon:',
      suffix: ' (degrees)</span>',
      separator: ' - Lat:',
      numDigits: 4,
      emptyString: ''
    }));

    var store = Ext.create("Ext.data.TreeStore", {
      model: "GeoExt.data.LayerTreeModel",
      root: {
        plugins: [
          {
            ptype: "gx_layercontainer",
            loader: {
              createNode: function(attr) {
                if (attr.layer.legend) {
                  attr.component = {
                   
                    xtype: "gx_legendimage",
                    url: attr.layer.legend,
                    listeners: {
                        'legendimageloaded': function() {
                            this.fireEvent('legendimageloaded', this);
                        },
                        scope: this
                    }
                  }
                }
                else {
                  attr.component = {
                    xtype: "gx_wmslegendpatched",
                    layerRecord: mapPanel.layers.getByLayer(attr.layer),
                    showTitle: false,
                    cls: "legend",
                    listeners: {
                      legendimageloaded: onLegendLoaded
                    }
                  };
                }
                return GeoExt.tree.LayerLoader.prototype.createNode.call(
                  this,
                  attr
                );
              }
            }
          }
        ]
      }
    });

    
 var cacheRead = new OpenLayers.Control.CacheRead();
    mapPanel.map.addControl(cacheRead);

    var cacheWrite = new OpenLayers.Control.CacheWrite({
      autoActivate: true,
      imageFormat: "image/png",
      eventListeners: {
        cachefull: function() {
          alert("Cache full.");
        }
      }
    });
     mapPanel.map.addControl(cacheWrite);




    var tree = Ext.create("GeoExt.tree.Panel", {
      region: "center",

      flex: 3,

      viewConfig: {
        plugins: [
          {
            ptype: "treeviewdragdrop",

            appendOnly: false
          }
        ]
      },
      store: store,
      rootVisible: false,
      lines: false,
      scrollable: false,

      renderTo: Ext.getBody()
    });

    function onLegendLoaded(map, layer) {
      this.update();
    }

    function addLayers(layerSet) {
      var firstLayer = layerSet[0];

      var me = this;
      
      numLayersVisible = 0;
      numLayersRendered = 0;

      for (var i = 0; i < layerSet.length - 1; i++) {
        mapPanel.map.addLayer(layerSet[i]);
        layerSet[i].events.on({ loadend: onLayerLoadEnds });
      }
      firstLayer.events.on({ loadstart: onLayerLoadStarts });
      for (var i = 0; i < mapPanel.map.layers.length; i++) {
        if (mapPanel.map.layers[i].getVisibility()) numLayersVisible++;
      }
    }

    var tree = Ext.create("Ext.Viewport", {
      layout: "fit",

      hideBorders: true,

      items: {
        layout: "border",

        items: [
          {
            region: "center",

            layout: "border",
            items: [
            {
                region: "north",
                xtype: "panel",
                title: "Flood Hazard Exposure Map",
                width: 200,

                map: mapPanel,



              },
              {
                region: "north",
                xtype: "gx_geocodercombo_patched",
                width: 200,

                map: mapPanel,

                url: "https://nominatim.openstreetmap.org/search?format=json&countrycodes=AF"

              },


              mapPanel
            ]
          },
          {
            region: "east",
            collapsible: true,
            collapseDirection: "left",
            width: "22%",
            title: "Layers",
            layout: {
              type: "vbox",

              align: "stretch",
              pack: "start"
            },

            items: [
              tree,
              {
                title: "Overview",
                region: "south",

                flex: 1.8,
                 layout: 'fit',
                collapsible: true,

                items: [
                  {
                    xtype: "gx_overviewmap",
                    title: "Overview",
                    height: "100%",
                    width: "100%",
                    padding: 0,
                    border: 0
                  }
                ]
              }
            ]
          },


        ]
      }
    });
  }
});
