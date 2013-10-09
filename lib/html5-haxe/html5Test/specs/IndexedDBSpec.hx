package html5Test.specs;
import html5.Html5;
import html5.indexedDB.IDBDatabase;
import html5.indexedDB.IDBRequest;
import html5.indexedDB.IDBTransaction;
import jasmine.J;
import jasmine.Jasmine;
import js.Dom;

class IndexedDBSpec {

	private inline static var DATABASE_NAME = "TestDatabase";
	private inline static var DATABASE_VERSION = "1";
	private inline static var OBJECT_STORE_NAME = "torrent";
	
	public function new() {
		var me = this;

		J.describe("IndexedDB", function() {

			var db : IDBDatabase = null;

			J.it("should open", function() {
				var request = Html5.indexedDb.open(DATABASE_NAME);
				request.onsuccess = function( e : Event ) {
					db = request.result;
				};
				J.expect(db).toBeNull();
				
				J.waitsFor(function() {
					return request.readyState == IDBRequest.DONE;
				}, "open database request to finish");
				
				J.runs(function() {
					J.expect(db).not.toBeNull();
					J.expect(db.name).toBe(DATABASE_NAME);
				});
			});
			
			J.it("should set version", function() {
				var r = db.setVersion(DATABASE_VERSION);
				r.onsuccess = cast Jasmine.createSpy("007");
				J.waitsFor(function() { return r.readyState == IDBRequest.DONE; } );
				J.runs(function() {
					J.expect(r.onsuccess).toHaveBeenCalled();
					J.expect(db.version).toBe(DATABASE_VERSION);
				});
			});
			
			J.it("should create an object store", function() {
				var r = db.setVersion(DATABASE_VERSION);
				r.onsuccess = function( e : Event ) {
					var os = db.createObjectStore(OBJECT_STORE_NAME);
					J.expect(os).not.toBeNull();
					J.expect(os.name).toBe(OBJECT_STORE_NAME);
				}
				var spy = J.spyOn(r, "onsuccess").andCallThrough();
				J.waitsFor(function() { return r.readyState == IDBRequest.DONE; } );
				J.runs(function() { J.expect(spy).toHaveBeenCalled(); } );
			} );
			
			J.it("should add a key value pair to an object store", function() {
				var t = db.transaction([OBJECT_STORE_NAME], IDBTransaction.READ_WRITE);
				var completeSpy = J.spyOn(t, "oncomplete");
				J.expect(t.mode).toBe(IDBTransaction.READ_WRITE);
				J.expect(t.db).not.toBeNull();
				var os = t.objectStore(OBJECT_STORE_NAME);
				J.expect(os).not.toBeNull();
				J.expect(os.name).toBe(OBJECT_STORE_NAME);
				var r = os.add("value", "key");
				r.onsuccess = cast Jasmine.createSpy("007");
				J.waitsFor(function() { return completeSpy.callCount == 1; }, "transaction");
				J.runs(function() {
					J.expect(t.oncomplete).toHaveBeenCalled();
					J.expect(r.onsuccess).toHaveBeenCalled();
				});
			});

			J.it("should get a key value pair that was added to an object store", function() {
				var r = db.transaction([OBJECT_STORE_NAME], IDBTransaction.READ_ONLY)
					.objectStore(OBJECT_STORE_NAME)
					.get("key");
				J.waitsFor(function() { return r.readyState == IDBRequest.DONE; }, "get key" );
				J.runs(function() { J.expect(r.result).toBe("value"); } );
			});

			J.it("should not add a duplicate key to an object store", function() {
				var t = db.transaction([OBJECT_STORE_NAME], IDBTransaction.READ_WRITE);
				t.onabort = cast Jasmine.createSpy("007");
				var r = t.objectStore(OBJECT_STORE_NAME).add("value", "key");
				J.waitsFor(function() { return r.readyState == IDBRequest.DONE; }, "add duplicate key");
				J.runs(function() { J.expect(t.onabort).toHaveBeenCalled(); } );
			});
			
			J.it("should delete a key from an object store", function() {
				var r = db.transaction([OBJECT_STORE_NAME], IDBTransaction.READ_WRITE)
					.objectStore(OBJECT_STORE_NAME)
					.delete("key");
				r.onsuccess = cast Jasmine.createSpy("007");
				J.waitsFor(function() { return r.readyState == IDBRequest.DONE; }, "delete key");
				J.runs(function() { J.expect(r.onsuccess).toHaveBeenCalled(); } );
			});
			
			J.it("should not get key that was deleted from object store", function() {
				var r = db.transaction([OBJECT_STORE_NAME], IDBTransaction.READ_ONLY)
					.objectStore(OBJECT_STORE_NAME)
					.get("key");
				r.onsuccess = cast Jasmine.createSpy("007");
				J.waitsFor(function() { return r.readyState == IDBRequest.DONE; }, "get key" );
				J.runs(function() { 
					J.expect(r.onsuccess).toHaveBeenCalled();
					J.expect(r.result).not.toBeDefined();
				});
			});
			
			J.it("should put a key value pair to an object store", function() {
				var r = db.transaction([OBJECT_STORE_NAME], IDBTransaction.READ_WRITE)
					.objectStore(OBJECT_STORE_NAME)
					.put("value", "key");
				r.onsuccess = cast Jasmine.createSpy("007");
				J.waitsFor(function() { return r.readyState == IDBRequest.DONE; }, "put key" );
				J.runs(function() { J.expect(r.onsuccess).toHaveBeenCalled(); } );
			});
			
			J.it("should get a key value pair that was put to an object store", function() {
				var r = db.transaction([OBJECT_STORE_NAME], IDBTransaction.READ_ONLY)
					.objectStore(OBJECT_STORE_NAME)
					.get("key");
				J.waitsFor(function() { return r.readyState == IDBRequest.DONE; }, "get key" );
				J.runs(function() { J.expect(r.result).toBe("value"); } );
			});
			
			J.it("should put an existing key value pair to an object store", function() {
				var r = db.transaction([OBJECT_STORE_NAME], IDBTransaction.READ_WRITE)
					.objectStore(OBJECT_STORE_NAME)
					.put("value", "key");
				r.onsuccess = cast Jasmine.createSpy("007");
				J.waitsFor(function() { return r.readyState == IDBRequest.DONE; }, "put existing key" );
				J.runs(function() { J.expect(r.onsuccess).toHaveBeenCalled(); } );
			});
			
			J.it("should delete an object store", function() {
				var r = db.setVersion(DATABASE_VERSION);
				r.onsuccess = function(e:Event) { db.deleteObjectStore(OBJECT_STORE_NAME); };
				var spy = J.spyOn(r, "onsuccess").andCallThrough();
				J.waitsFor(function() { return r.readyState == IDBRequest.DONE; } );
				J.runs(function() { J.expect(spy).toHaveBeenCalled(); } );
			});

			J.it("should close", function() {
				db.close();
			});
			
		} );
	}
}