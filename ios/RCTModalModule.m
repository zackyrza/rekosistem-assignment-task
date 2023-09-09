//
//  RCTModalModule.m
//  rekosistemAssignmentTask
//
//  Created by Rifqy Zacky Ariadhy on 09/09/23.
//

#import <Foundation/Foundation.h>
#import "RCTModalModule.h"

@implementation RCTModalModule

// To export a module named RCTModalModule
RCT_EXPORT_MODULE(ModalNativeModule);

RCT_EXPORT_METHOD(show: (NSString *) title content:(NSString *) content)
{
  // Create simple modal alert
  dispatch_async(dispatch_get_main_queue(), ^{
      UIAlertController *alertController =
        [UIAlertController alertControllerWithTitle:title
                                            message:content
                                     preferredStyle:UIAlertControllerStyleAlert];

      UIAlertAction *okAction =
        [UIAlertAction actionWithTitle:@"OK"
                                 style:UIAlertActionStyleDefault
                               handler:^(UIAlertAction *action) {
      }];

      [alertController addAction:okAction];

      UIViewController *rootViewController =
        [[[[UIApplication sharedApplication] delegate] window] rootViewController];

      [rootViewController presentViewController:alertController animated:YES completion:nil];
    });
}

@end
