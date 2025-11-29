import { type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllOrders(search?: string, page?: number, limit?: number): Promise<{ orders: Order[]; total: number }>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, updates: Partial<Pick<Order, "customerName" | "phone" | "medicine" | "status">>): Promise<Order | undefined>;
  deleteOrder(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private orders: Map<string, Order>;

  constructor() {
    this.orders = new Map();
  }

  async getAllOrders(search?: string, page: number = 1, limit: number = 10): Promise<{ orders: Order[]; total: number }> {
    let orders = Array.from(this.orders.values());
    
    // Apply search filter
    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim();
      orders = orders.filter(order => 
        order.customerName.toLowerCase().includes(searchLower) ||
        order.medicine.toLowerCase().includes(searchLower) ||
        order.phone.includes(searchLower)
      );
    }
    
    // Sort by creation date (newest first)
    orders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    const total = orders.length;
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedOrders = orders.slice(startIndex, startIndex + limit);
    
    return { orders: paginatedOrders, total };
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: string, updates: Partial<Pick<Order, "customerName" | "phone" | "medicine" | "status">>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder: Order = {
      ...order,
      ...updates,
    };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orders.delete(id);
  }
}

export const storage = new MemStorage();
