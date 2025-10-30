//? Imports de codigo
import {
  FilterQuery,
  Model,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

export class BaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(rawData: Partial<T>, session?: any): Promise<T> {
    const document = new this.model({
      _id: new Types.ObjectId(),
      ...rawData,
    });
    await document.save({ session });
    return document;
  }

  async save(rawData: T, session?: any): Promise<T> {
    const document = new this.model(rawData);
    await document.save({ session });
    return document;
  }

  async findOne(
    query: FilterQuery<T>,
    projection?: string,
    options?: QueryOptions,
  ): Promise<T | null> {
    return await this.model.findOne(query, projection, options);
  }

  async findById(
    id: string | Types.ObjectId,
    projection?: string,
    options?: QueryOptions,
  ): Promise<T | null> {
    return await this.model.findById(id, projection, options);
  }

  async find(
    query: FilterQuery<T>,
    projection?: string,
    options?: QueryOptions,
  ): Promise<T[]> {
    return await this.model.find(query, projection, options);
  }

  async updateOne(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: any,
    session?: any,
  ): Promise<UpdateWriteOpResult> {
    const updateOptions = { ...options, session };
    return await this.model.updateOne(query, update, updateOptions);
  }

  async updateMany(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: any,
    session?: any,
  ): Promise<UpdateWriteOpResult> {
    const updateOptions = { ...options, session };
    return await this.model.updateMany(query, update, updateOptions);
  }

  async aggregate(pipeline: any[]): Promise<T[]> {
    return await this.model.aggregate(pipeline);
  }

  async exists(query: FilterQuery<T>): Promise<boolean> {
    return !!(await this.model.exists(query));
  }
}
