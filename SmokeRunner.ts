import NeuroID from 'neuroid-reactnative-sdk';

type SmokeCall = 
    | { name: string; run : () => void }
    | { name: string; run : () => Promise<unknown> };

export async function runSmoke(): Promise<void> {
  console.log('NeuroID SDK Smoke Test Running');

  const calls: SmokeCall[] = [
    { name: 'getSDKVersion', run: () => NeuroID.getSDKVersion() },
  ]

  // Basic API surface check
  for (const call of calls) {
    if (typeof call.run !== 'function') {
        console.log('NID_RN_SDK_FAIL');
        throw new Error(`Smoke Test: Call ${call.name} is not a function`);
    }
  }

  for (const call of calls) {
    try {
        const result = call.run();
        if (result && typeof (result as any).then === 'function') {
            await result;
        }
    } catch (error: any) {
        const msg = error?.message || error?.toString() || 'Unknown error';
        console.log(`Smoke Test: Call ${call.name} failed with error: ${msg}`);
        console.log('NID_RN_SDK_FAIL');
        throw error
    }
  }

  console.log('NeuroID SDK Smoke Test Passed');
  console.log('NID_RN_SDK_PASS');
}
