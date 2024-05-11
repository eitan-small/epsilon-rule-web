/**
 * JSON Schema 基础接口
 */
export interface JSONSchema {
  /** 唯一标识符 */
  $id?: string;
  /** 元数据规范 URI */
  $schema?: string;
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 默认值 */
  default?: any;
  /** 类型 */
  type: 'string' | 'number' | 'integer' | 'object' | 'array';

  /**
   * String 相关
   */
  /** 最小长度 */
  minLength?: number;
  /** 最大长度 */
  maxLength?: number;
  /** 正则模式 */
  pattern?: string;
  /** 格式 */
  format?: string;
  /** 枚举 */
  enum?: string[];

  /**
   * Number 和 Integer 相关
   */
  /** 倍数约束 */
  multipleOf?: number;
  /** 最大值 */
  maximum?: number;
  /** 是否排除最大值 */
  exclusiveMaximum?: number;
  /** 最小值 */
  minimum?: number;
  /** 是否排除最小值 */
  exclusiveMinimum?: number;

  /**
   * Object 相关
   */
  /** 属性列表 */
  properties?: { [key: string]: JSONSchema };
  /** 必需属性 */
  required?: string[];
  /** 最小属性数量 */
  minProperties?: number;
  /** 最大属性数量 */
  maxProperties?: number;

  /**
   * Array 相关
   */
  /** 子项模式 */
  items?: JSONSchema;
  /** 最小子项数量 */
  minItems?: number;
  /** 最大子项数量 */
  maxItems?: number;
  /** 是否要求子项唯一 */
  uniqueItems?: boolean;
}
