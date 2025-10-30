//? Imports de codigo
import {
  FilterQuery,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

export abstract class BaseRepositoryInterface<T> {
  abstract create(rawData: Partial<T>, session?: any): Promise<T>;
  abstract save(model: T, session?: any): Promise<T>;
  abstract findOne(
    query: FilterQuery<T>,
    projection?: string,
    options?: QueryOptions,
  ): Promise<T | null>;
  abstract findById(
    id: Types.ObjectId,
    projection?: string,
    options?: QueryOptions,
  ): Promise<T | null>;
  abstract find(
    query: FilterQuery<T>,
    projection?: string,
    options?: QueryOptions,
  ): Promise<T[]>;
  abstract updateOne(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions,
    session?: any,
  ): Promise<UpdateWriteOpResult>;
  abstract updateMany(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions,
    session?: any,
  ): Promise<UpdateWriteOpResult>;
  abstract aggregate(pipeline: any[]): Promise<T[]>;
  abstract exists(query: FilterQuery<T>): Promise<boolean>;
}
