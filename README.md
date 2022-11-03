# @capacitor-community/aaos-vehicle-property

Read VehicleProperties from Android Automotive OS

## Install

```bash
npm install @capacitor-community/aaos-vehicle-property
npx cap sync
```

## API

<docgen-index>

* [`quickView(...)`](#quickview)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### quickView(...)

```typescript
quickView(options: { dataId: number; }) => Promise<VehiclePropertyDataEvent>
```

Gets the raw values without utilizing a DataView to container possibly background-generated data and therefore getting an
immidiate response with the current value(s)

| Param         | Type                             | Description                            |
| ------------- | -------------------------------- | -------------------------------------- |
| **`options`** | <code>{ dataId: number; }</code> | The id of the vehicle property to view |

**Returns:** <code>Promise&lt;<a href="#vehiclepropertydataevent">VehiclePropertyDataEvent</a>&gt;</code>

--------------------


### Interfaces


#### VehiclePropertyDataEvent

| Prop       | Type                                              |
| ---------- | ------------------------------------------------- |
| **`data`** | <code>{ propertyId: number; value?: any; }</code> |

</docgen-api>
