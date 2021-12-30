import "reflect-metadata";

const bindMetadataKey = Symbol("bind");
const skipBindingMetadataKey = Symbol("bindSkip");
const customBindMetadataKey = Symbol("type");

export const bind = function (bindName: string) {
  return Reflect.metadata(bindMetadataKey, bindName);
};

export const customBind = function (
  bindName: string,
  binder: ((data: any) => any) | ((data: any, thisPass: any) => any)
) {
  return Reflect.metadata(customBindMetadataKey, { bindName, binder });
};

export abstract class Serializable {
  public serialize(source: any) {
    if (source === null) {
      return null as any;
    }
    Object.keys(this).forEach((srcKey) => {
      const destKey = Reflect.getMetadata(bindMetadataKey, this, srcKey);
      const typeData = Reflect.getMetadata("design:type", this, srcKey);
      const customBind = Reflect.getMetadata(
        customBindMetadataKey,
        this,
        srcKey
      );
      if (!destKey && !customBind) return;
      if (customBind) {
        this[srcKey as keyof this] = customBind.binder(
          source[customBind.bindName as keyof typeof source],
          this
        );
        return;
      }
      const srcObj = source[destKey as keyof typeof source];
      this[srcKey as keyof this] =
        typeData.prototype instanceof Serializable
          ? new (typeData as any)().serialize(srcObj)
          : srcObj;
    });
    return this;
  }
}
