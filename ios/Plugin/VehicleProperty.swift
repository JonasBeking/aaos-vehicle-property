import Foundation

@objc public class VehicleProperty: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
