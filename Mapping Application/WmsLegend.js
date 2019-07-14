Ext.require([
    "GeoExt.container.WmsLegend",      
  ]);
  

Ext.define(
  "GeoExt.container.WmsLegendPatched",
  {
    extend: "GeoExt.container.LayerLegend",
    alias: "widget.gx_wmslegendpatched",
    requires: ["GeoExt.LegendImage"],
    alternateClassName: "GeoExt.WMSLegendPatched",

    statics: {
      supports: function(layerRecord) {
        return layerRecord.getLayer() instanceof OpenLayers.Layer.WMS ? 1 : 0;
      },

      validIdRe: Ext.validIdRe || /^[a-z_][a-z0-9\-_]*$/i,

      illegalItemIdRe: /[^\w\-]+/g,

      itemIdPrefix: "gx_itemId_",

      layernameToItemId: function(name) {
        var layername = name ? "" + name : "",
          staticMe = GeoExt.container.WmsLegend,
          prefix = staticMe.itemIdPrefix,
          validIdRe = staticMe.validIdRe,
          illegalItemIdRe = staticMe.illegalItemIdRe,
          replace = "-",
          itemId;
        if (validIdRe.test(layername)) {
          itemId = layername;
        } else {
          itemId = prefix + layername.replace(illegalItemIdRe, replace);
        }
        return itemId;
      }
    },

    defaultStyleIsFirst: true,

    useScaleParameter: true,

    initComponent: function() {
      var me = this;
      var me = this;
      me.callParent(arguments);

      var layer = me.layerRecord.getLayer();
      me._noMap = !layer.map;
      // layer.events.register("moveend", me, me.onLayerMoveend);

      me.update();
    },

    getLabel: function() {
      var label = this.items.get(0);
      if (label.rendered) {
        if (label.el.dom)
          return label.rendered ? label.el.dom.innerHTML : label.html;
      }
      return label.html;
    },

    onLayerMoveend: function(e) {
      if (
        (e.zoomChanged === true && this.useScaleParameter === true) ||
        this._noMap
      ) {
        delete this._noMap;
        this.update();
      }
    },

    getLegendUrl: function(layerName, layerNames) {
      var rec = this.layerRecord;
      var url;
      var styles = rec && rec.get("styles");
      var layer = rec.getLayer();
      layerNames = layerNames || [layer.params.LAYERS].join(",").split(",");

      var styleNames =
        layer.params.STYLES && [layer.params.STYLES].join(",").split(",");
      var idx = Ext.Array.indexOf(layerNames, layerName);
      var styleName = styleNames && styleNames[idx];
      var params = {};

      if (styles && styles.length > 0) {
        if (styleName) {
          Ext.each(styles, function(s) {
            url = s.name == styleName && s.legend && s.legend.href;
            return !url;
          });
        } else if (
          this.defaultStyleIsFirst === true &&
          !styleNames &&
          !layer.params.SLD &&
          !layer.params.SLD_BODY
        ) {
          url = styles[0].legend && styles[0].legend.href;
        }
        params = Ext.apply({}, this.baseParams);
      }
      if (!url) {
        var paramObject = Ext.apply(
          {
            REQUEST: "GetLegendGraphic",
            WIDTH: null,
            HEIGHT: null,
            EXCEPTIONS: "application/vnd.ogc.se_xml",
            LAYER: layerName,
            LAYERS: null,
            STYLE: styleName !== "" ? styleName : null,
            STYLES: "legend_options=FontName:TimesNewRoman",
            SRS: null,
            FORMAT: null,
            TIME: null
          },
          this.baseParams
        );

        url = layer.getFullRequestString(paramObject);
        params = {};
      }
      if (layer.params._OLSALT) {
        params._OLSALT = layer.params._OLSALT;
      }
      url = Ext.urlAppend(url, Ext.urlEncode(params));
      if (url.toLowerCase().indexOf("request=getlegendgraphic") != -1) {
        if (url.toLowerCase().indexOf("format=") == -1) {
          url = Ext.urlAppend(url, "FORMAT=image%2Fgif");
        }

        if (this.useScaleParameter === true) {
          var scale = layer.map.getScale();
          url = Ext.urlAppend(url, "SCALE=" + scale);
        }
      }
      return url;
    },

    update: function() {
      var layer = this.layerRecord.getLayer();

      if (!(layer && layer.map)) {
        return;
      }
      this.callParent();

      var layerNames,
        layerName,
        i,
        len,
        itemIdCandidate,
        itemIdCandidates = [];

      layerNames = [layer.params.LAYERS].join(",").split(",");

      Ext.each(
        layerNames,
        function(name) {
          itemIdCandidates.push(this.self.layernameToItemId(name));
        },
        this
      );

      var destroyList = [];
      var textCmp = this.items.get(0);
      this.items.each(function(cmp) {
        i = Ext.Array.indexOf(itemIdCandidates, cmp.itemId);
        if (i < 0 && cmp != textCmp) {
          destroyList.push(cmp);
        } else if (cmp !== textCmp) {
          layerName = layerNames[i];
          var newUrl = this.getLegendUrl(layerName, layerNames);
          if (!OpenLayers.Util.isEquivalentUrl(newUrl, cmp.url)) {
            try {
              cmp.setUrl(newUrl);
            } catch (e) {
              console.warn("Problem while getting legend newUrl " + newUrl);
            }
          }
        }
      }, this);
      for (i = 0, len = destroyList.length; i < len; i++) {
        var cmp = destroyList[i];

        this.remove(cmp);
        cmp.destroy();
      }

      for (i = 0, len = layerNames.length; i < len; i++) {
        layerName = layerNames[i];
        itemIdCandidate = this.self.layernameToItemId(layerName);
        if (!this.items || !this.getComponent(itemIdCandidate)) {
          this.add({
            xtype: "gx_legendimage",
            url: this.getLegendUrl(layerName, layerNames),
            itemId: itemIdCandidate,
            listeners: {
              legendimageloaded: function() {
                this.fireEvent("legendimageloaded", this);
              },
              scope: this
            }
          });
        }
      }
      this.doLayout();
    },

    beforeDestroy: function() {
      if (this.useScaleParameter === true) {
        var layer = this.layerRecord.getLayer();
        layer &&
          layer.events &&
          layer.events.unregister("moveend", this, this.onLayerMoveend);
      }
      this.callParent();
    }
  },
  function() {
    GeoExt.container.LayerLegend.types["gx_wmslegendpatched"] =
      GeoExt.container.WmsLegendPatched;
  }
);
