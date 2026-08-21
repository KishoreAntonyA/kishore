import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Order, OrderMessage, DeliverableFile, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/initialData';

const ORDERS_COLLECTION = 'orders';

/**
 * Initializes Firestore with the default demo orders if the collection is empty.
 */
export async function seedInitialOrdersIfEmpty(): Promise<void> {
  try {
    const ordersSnapshot = await getDocs(collection(db, ORDERS_COLLECTION));
    if (ordersSnapshot.empty) {
      console.log('Seeding initial orders into Firestore...');
      for (const order of INITIAL_ORDERS) {
        await setDoc(doc(db, ORDERS_COLLECTION, order.id), {
          ...order,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp()
        });
      }
    }
  } catch (error: any) {
    console.warn('Firestore seeding notice (operating in local/cached mode):', error?.message || error);
  }
}

/**
 * Real-time subscription to all orders in Firestore.
 */
export function subscribeToOrders(onUpdate: (orders: Order[]) => void): () => void {
  try {
    const colRef = collection(db, ORDERS_COLLECTION);
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot || snapshot.empty) {
          onUpdate(INITIAL_ORDERS);
          return;
        }
        const fetchedOrders: Order[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as Order;
          return {
            ...data,
            id: docSnap.id
          };
        });
        onUpdate(fetchedOrders);
      },
      (error) => {
        console.warn('Firestore orders live subscription note (maintaining local state):', error.message);
        onUpdate(INITIAL_ORDERS);
      }
    );
  } catch (err) {
    console.warn('Failed to attach Firestore snapshot listener, defaulting to initial state:', err);
    onUpdate(INITIAL_ORDERS);
    return () => {};
  }
}

/**
 * Saves a new order to Firestore.
 */
export async function saveOrderToFirestore(order: Order): Promise<void> {
  try {
    await setDoc(doc(db, ORDERS_COLLECTION, order.id), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving order to Firestore:', error);
    throw error;
  }
}

/**
 * Updates order status in Firestore.
 */
export async function updateOrderStatusInFirestore(
  orderId: string,
  status: OrderStatus,
  statusLabel: string,
  progressPercentage?: number
): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    const updateData: any = {
      status,
      statusLabel,
      updatedAt: serverTimestamp()
    };
    if (progressPercentage !== undefined) {
      updateData.progressPercentage = progressPercentage;
    }
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating order status in Firestore:', error);
    throw error;
  }
}

/**
 * Appends a message to an order's message list.
 */
export async function addMessageToOrderInFirestore(
  orderId: string,
  currentMessages: OrderMessage[],
  newMessage: OrderMessage
): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, {
      messages: [...currentMessages, newMessage],
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding message in Firestore:', error);
    throw error;
  }
}

/**
 * Appends a deliverable file to an order's files list.
 */
export async function addFileToOrderInFirestore(
  orderId: string,
  currentFiles: DeliverableFile[],
  newFile: DeliverableFile
): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, {
      files: [newFile, ...currentFiles],
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding file to order in Firestore:', error);
    throw error;
  }
}
